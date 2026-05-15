import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { DashboardComponent } from '../dashboard/dashboard';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardComponent],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent implements OnChanges {
  @Input() productToEdit: Product | null = null;

  editing = false;
  public categorias = ['Banho', 'Mão', 'Corpo', 'Óleos', 'Cabelos', 'Infantis', 'Pele', 'Kits'];

  newProduct: Product = {
    name: '',
    price: 0.01,
    description: '',
    quantity: 0,
    categoria: '',
    image_path: 'assets/products/default.png'
  };



  selectedImage: File | null = null;
  selectedExcelFile: File | null = null; // Reintegrado
  isUploadingExcel = false;              // Reintegrado
  progress = 0;                          // Reintegrado

  constructor(
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) {}


  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit'] && this.productToEdit) {
          console.log('Produto recebido para edição:', this.productToEdit);


      this.editing = true;
      this.newProduct = { ...this.productToEdit };
      console.log('Produto recebido para edição:', this.productToEdit);
    }
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // --- MÉTODOS DE EXCEL REINTEGRADOS ---
  onExcelSelected(event: any) {
    this.selectedExcelFile = event.target.files[0];
    this.progress = 0;
  }

  uploadExcel() {
    if (!this.selectedExcelFile) return;

    this.isUploadingExcel = true;
    this.progress = 0;

    const formData = new FormData();
    formData.append('file', this.selectedExcelFile);

    this.http.post('http://localhost:5000/products/upload-excel', formData, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          alert(event.body.message);
          this.isUploadingExcel = false;
          this.progress = 0;
          this.selectedExcelFile = null;
          this.finalizar();
        }
      },
      error: (err) => {
        console.error('Erro no upload Excel:', err);
        alert('Erro ao processar a planilha.');
        this.isUploadingExcel = false;
        this.progress = 0;
      }
    });

  }

  saveProduct() {
    if (!this.newProduct.categoria) {
      alert('Erro: A categoria é obrigatória!');
      return;
    }

    if (this.selectedImage) {
      this.productService.uploadImage(this.selectedImage).subscribe({
        next: (res: any) => {
          this.newProduct.image_path = res.image_path;
          this.executeSave();
        },
        error: () => this.executeSave()
      });
    } else {
      this.executeSave();
    }
  }

// No arquivo product-form.ts
// src/app/components/product-form/product-form.ts

private executeSave() {
  // Criamos um objeto novo (payload) para garantir que a estrutura seja plana
  // e contenha todos os campos obrigatórios definidos no seu schemas.py
  const payload = {
    name: this.newProduct.name,
    description: this.newProduct.description || '',
    quantity: Number(this.newProduct.quantity),
    price: Number(this.newProduct.price),
    image_path: this.newProduct.image_path || 'assets/products/default.png',
    // ESTA LINHA É A MAIS IMPORTANTE:
    categoria: this.newProduct.categoria || 'Kits'
  };
  console.log('Payload FINAL:', JSON.stringify(payload, null, 2));

  // Log crucial: Verifique se este objeto no console contém a chave "categoria"
  console.log('JSON final enviado para o Flask:', payload);

  if (this.editing && this.productToEdit?.id) {
    // Na atualização, o ID vai na URL e o payload no corpo da requisição
    this.productService.updateProduct(this.productToEdit.id, payload).subscribe({
      next: () => {
        alert('Produto atualizado com sucesso!');
        this.finalizar(); // Chama o método para limpar e atualizar a tela
      },
      error: (err: any) => {
        console.error('Erro detalhado do Flask:', err.error);
        const campoErro = err.error?.detail?.json?.categoria;
        alert('Erro ao atualizar: ' + (campoErro ? 'Campo categoria ausente' : 'Verifique os dados'));
      }
    });
  } else {
    // Lógica para cadastro (POST)
    this.productService.addProduct(payload).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.finalizar();
      },
      error: (err: any) => {
        console.error('Erro ao cadastrar:', err.error);
        alert('Erro ao cadastrar: Verifique se selecionou a categoria.');
      }
    });
  }
}

// Método auxiliar para fechar o modal e atualizar a lista de produtos
finalizar() {
  this.editing = false;
  this.productToEdit = null;
  window.location.reload();
}
}
