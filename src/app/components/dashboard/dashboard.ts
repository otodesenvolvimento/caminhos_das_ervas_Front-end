import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container" style="padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 30px;">
      <h3 style="color: #4a6741; font-family: 'Playfair Display', serif; margin-bottom: 20px;">📊 Dashboard de Inventário</h3>

      <div style="display: flex; gap: 20px; margin-bottom: 30px;">
        <div style="flex: 1; background: #f0f7f0; padding: 15px; border-radius: 8px; border-left: 5px solid #4a6741;">
          <span style="font-size: 0.9em; color: #666;">Total de Itens em Stock</span>
          <h2 style="margin: 5px 0; color: #4a6741;">{{ totalStock }}</h2>
        </div>
        <div style="flex: 1; background: #fef9f0; padding: 15px; border-radius: 8px; border-left: 5px solid #c5a059;">
          <span style="font-size: 0.9em; color: #666;">Valor Total Estimado</span>
          <h2 style="margin: 5px 0; color: #c5a059;">R$ {{ totalValue | number:'1.2-2' }}</h2>
        </div>
      </div>

      <h4 style="color: #666; margin-bottom: 15px;">Top 5 Produtos (Volume)</h4>
      <div class="chart">
        <div *ngFor="let p of topProducts" style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85em; margin-bottom: 5px;">
            <span>{{ p.name }}</span>
            <strong>{{ p.quantity }} un.</strong>
          </div>
          <div style="background: #eee; border-radius: 10px; height: 12px; width: 100%;">
            <div [style.width.%]="calculateWidth(p.quantity)"
                 style="background: #4a6741; height: 100%; border-radius: 10px; transition: width 1s ease;">
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  totalStock = 0;
  totalValue = 0;
  topProducts: Product[] = [];
  maxStock = 1;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        if (products && products.length > 0) {
          // Garante a conversão para número para evitar o "0"
          this.totalStock = products.reduce((acc, p) => acc + (Number(p.quantity) || 0), 0);
          this.totalValue = products.reduce((acc, p) => acc + ((Number(p.quantity) || 0) * (Number(p.price) || 0)), 0);

          // Ordena e pega os 5 maiores
          this.topProducts = [...products]
            .sort((a, b) => (Number(b.quantity) || 0) - (Number(a.quantity) || 0))
            .slice(0, 5);

          // Calcula o valor máximo para a escala do gráfico
          this.maxStock = Math.max(...this.topProducts.map(p => Number(p.quantity) || 0), 1);

          this.cdr.detectChanges(); // Força a atualização da tela
        }
      },
      error: (err) => console.error('Erro no Dashboard:', err)
    });
  }

  calculateWidth(quantity: number): number {
    return (Number(quantity) / this.maxStock) * 100;
  }
}
