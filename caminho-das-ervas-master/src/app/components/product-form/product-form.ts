import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http'; // Adicionado HttpEventType
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
  newProduct: Product = {
    name: '',
    price: 0.01,
    description: '',
    quantity: 0
  };

  selectedImage: File | null = null;
  selectedExcelFile: File | null = null;
  isUploadingExcel = false;
  progress = 0; // Variável para a barra de progresso

  constructor(
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit'] && this.productToEdit) {
      this.editing = true;
      this.newProduct = { ...this.productToEdit };
    }
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onExcelSelected(event: any) {
    this.selectedExcelFile = event.target.files[0];
    this.progress = 0; // Reseta ao selecionar novo ficheiro
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
          // Cálculo real do progresso baseado nos bytes enviados
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          alert(event.body.message);
          this.isUploadingExcel = false;
          this.progress = 0;
          this.selectedExcelFile = null;
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Erro no upload:', err);
        alert('Erro ao processar a planilha.');
        this.isUploadingExcel = false;
        this.progress = 0;
      }
    });
  }

saveProduct() {
  if (this.selectedImage) {
    this.productService.uploadImage(this.selectedImage).subscribe({
      next: (res: any) => {
        // Agora usamos 'image_path' que é o que o seu Flask envia
        this.newProduct.image_path = res.image_path;
        console.log('Caminho salvo:', this.newProduct.image_path);
        this.executeSave();
      },
      error: (err: any) => {
        console.error('Erro no upload da imagem:', err);
        alert('Erro ao enviar imagem. Salvando com imagem padrão.');
        this.executeSave();
      }
    });
  } else {
    this.executeSave();
  }
}

  private executeSave() {
    if (this.editing && this.productToEdit?.id) {
      this.productService.updateProduct(this.productToEdit.id, this.newProduct).subscribe({
        next: () => {
          alert('Produto atualizado!');
          this.router.navigate(['/']);
        }
      });
    } else {
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          alert('Produto cadastrado!');
          this.router.navigate(['/']);
        }
      });
    }
  }
}
