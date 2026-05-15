import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css',
})
export class PagamentoComponent {
  constructor (public carrinhoService: CarrinhoService) {}
}