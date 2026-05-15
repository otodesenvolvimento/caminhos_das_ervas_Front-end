import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css',
})

  export class PagamentoComponent {
  pagamentoRealizado: boolean = false;

  formularioPagamento = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    endereco: new FormControl('', [Validators.required])
  });

  constructor(public carrinhoService: CarrinhoService) {}

  confirmarPagamento() {
    if (this.formularioPagamento.valid) {
      this.pagamentoRealizado = true;
      this.carrinhoService.limparCarrinho();
      console.log('Dados do comprador:', this.formularioPagamento.value);
    }
  }
}