import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necessário para o @if
import { RodapeComponent } from './components/rodape/rodape.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';

// Importe o serviço e o componente da lista de produtos
import { AdminModalService } from './services/admin-modal.service';
import { ProductListComponent } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RodapeComponent,
    CabecalhoComponent,
    CarrinhoComponent,
    ProductListComponent // Adicione aqui para o modal funcionar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-caminho-das-ervas');

  // Injete o serviço aqui como 'public' para que o template o consiga ver
  constructor(public adminService: AdminModalService) {}
}
