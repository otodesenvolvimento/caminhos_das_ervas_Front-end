import { Component, Input } from '@angular/core';
import { produtoModel } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho.service'; 

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css',
})
export class ProdutoComponent {
  @Input() produto!: produtoModel;

  constructor(private carrinhoService: CarrinhoService) {}
  
  adicionarAoCarrinho() {
    this.carrinhoService.adicionarAoCarrinho(this.produto);
  }
}
