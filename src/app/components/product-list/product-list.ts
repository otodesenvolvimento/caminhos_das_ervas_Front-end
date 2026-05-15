import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { AdminModalService } from '../../services/admin-modal.service';
import { ProductFormComponent } from '../product-form/product-form';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  // Controle de estado da interface
  sessaoAtiva: 'lista' | 'cadastro' = 'lista';
  produtoParaEditar: Product | null = null; // Variável que envia dados ao formulário
  usuarioNome: string | null = null;

  // Dados dos produtos
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  @Output() onEdit = new EventEmitter<Product>();

  constructor(
    private productService: ProductService,
    public adminService: AdminModalService, // Para fechar o modal
    private loginService: LoginService, // Para exibir o nome do admin
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();

    // Recupera o nome do usuário logado
    this.loginService.usuarioLogado$.subscribe(user => {
      this.usuarioNome = user;
      this.cdr.detectChanges();
    });
  }

  // Alterna abas e limpa o estado de edição se necessário
  setSessao(tipo: 'lista' | 'cadastro') {
    this.sessaoAtiva = tipo;
    if (tipo === 'lista') {
      this.produtoParaEditar = null; // Reseta a ponte ao voltar para a lista
      this.loadProducts();
    }
  }

  fazerLogoutAdmin() {
    this.adminService.fechar(); // Fecha o overlay
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilter();
        this.cdr.detectChanges();
      },
      error: (err) => { console.error('Erro ao buscar produtos', err); }
    });
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    }
  }

  deleteProduct(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('Produto removido!');
          this.loadProducts();
        },
        error: (err) => { alert('Erro ao excluir: Verifique se é administrador.'); }
      });
    }
  }

  // Método crucial para carregar o formulário com dados
  editProduct(product: Product) {
    console.log('Editando:', product);
    this.produtoParaEditar = { ...product }; // Cria uma cópia para edição
    this.sessaoAtiva = 'cadastro'; // Muda para a aba do formulário
    this.onEdit.emit(product); // Mantém compatibilidade com eventos externos
    this.cdr.detectChanges(); // Garante que o @Input do form seja atualizado
  }
}
