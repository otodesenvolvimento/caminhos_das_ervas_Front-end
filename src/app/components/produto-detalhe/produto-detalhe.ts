import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { produtoModel } from '../../models/produto.model';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.css'
})
export class ProdutoDetalheComponent {
  // Recebe o produto do componente pai
  @Input() produto!: produtoModel;

  // Emite um evento para fechar o modal
  @Output() onClose = new EventEmitter<void>();

  constructor(private carrinhoService: CarrinhoService) {}

  fechar() {
    this.onClose.emit();
  }

  adicionarAoCarrinho() {
    this.carrinhoService.adicionarAoCarrinho(this.produto);
    this.fechar(); // Opcional: fecha o modal após adicionar
  }
}
