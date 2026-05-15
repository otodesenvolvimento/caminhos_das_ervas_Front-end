import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// ADICIONE ESTA LINHA ABAIXO (ajuste o caminho se necessário):
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  // Agora o TypeScript vai reconhecer o ProductService no construtor
  currentUser: any | null = null;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef // Adicione o ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.productService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.currentUser = user;
        this.cdr.detectChanges();
        console.log("Usuário carregado com sucesso:", this.currentUser);
      },
      error: () => {
        this.currentUser = null;
        this.cdr.detectChanges();
      }
    });
  }
}
