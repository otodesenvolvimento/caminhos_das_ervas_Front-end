import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🛡️ Necessário para a busca
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🛡️ Importe FormsModule aqui
  styleUrl: './product-list.css',
  template: `
    <div class="list-container" style="padding: 20px;">
      <h2 style="color: #2d5a27; margin-bottom: 20px;">🌿 Catálogo Caminho das Ervas</h2>

      <div class="search-bar" style="margin-bottom: 30px;">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (input)="applyFilter()"
          placeholder="🔍 Pesquisar por velas, sabonetes ou ervas..."
          style="width: 100%; padding: 15px; border-radius: 10px; border: 1px solid #217346; font-size: 16px; outline: none; box-shadow: 0 2px 5px rgba(0,0,0,0.1);"
        >
      </div>

      <div class="product-grid" *ngIf="filteredProducts.length > 0; else empty">
        <div *ngFor="let p of filteredProducts" class="product-card">
          <img
            [src]="'http://localhost:5000/' + p.image_path"
            alt="Imagem de {{ p.name }}"
            class="product-img"
            onerror="this.src='http://localhost:5000/assets/products/default.png'"
          >
          <h4>{{ p.name }}</h4>
          <p style="height: 45px; overflow: hidden;">{{ p.description }}</p>
          <span class="price">R$ {{ p.price | number:'1.2-2' }}</span>

          <div class="admin-actions">
            <button (click)="editProduct(p)" class="btn-edit">Editar</button>
            <button (click)="deleteProduct(p.id!)" class="btn-delete">Excluir</button>
          </div>
        </div>
      </div>

      <ng-template #empty>
        <p style="text-align: center; padding: 2rem; color: #666;">
          {{ searchTerm ? 'Nenhum produto encontrado para "' + searchTerm + '"' : 'Carregando produtos ou vitrine vazia...' }}
        </p>
      </ng-template>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = []; // 📊 Lista usada para exibir os dados filtrados
  searchTerm: string = '';

  @Output() onEdit = new EventEmitter<Product>();

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilter(); // 📊 Inicializa a lista filtrada com todos os produtos
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
        next: () => { alert('Produto removido!'); this.loadProducts(); },
        error: (err) => { alert('Erro ao excluir: Verifique se é administrador.'); }
      });
    }
  }

  editProduct(product: Product) {
    this.onEdit.emit(product);
  }
}
