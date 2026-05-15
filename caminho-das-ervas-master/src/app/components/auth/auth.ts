import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // <-- Importante para mudar de página
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="auth-container">
      <h2>Acesso Administrativo</h2>
      <div class="grid-form">
        <!-- Mantemos a classe full-width para o estilo premium -->
        <input [(ngModel)]="user.username" placeholder="Usuário" class="full-width">
        <input [(ngModel)]="user.password" type="password" placeholder="Senha" class="full-width">

        <button (click)="handleAuth('login')" class="btn-main full-width">Entrar</button>

        <p style="text-align: center; width: 100%; margin: 15px 0; color: #666; font-family: 'Montserrat', sans-serif;">OU</p>

        <button style="background: transparent; border: 1px solid var(--primary-green); color: var(--primary-green);"
                class="full-width" (click)="handleAuth('register')">Criar Nova Conta</button>
      </div>
    </div>
  `
})
export class AuthComponent {
  user = { username: '', password: '' };

  // Injetamos o Router aqui no construtor
  constructor(private productService: ProductService, private router: Router) {}

  handleAuth(type: 'login' | 'register') {
    if (!this.user.username || !this.user.password) {
      alert("Preencha todos os campos");
      return;
    }

    // Decide qual método do serviço chamar com base no botão clicado
    const request = type === 'login' ?
      this.productService.login(this.user) :
      this.productService.register(this.user);

      request.subscribe({
        next: (res: any) => {
          alert(res.message || (type === 'login' ? "Login com sucesso!" : "Conta criada!"));

          // Se for login, redireciona o usuário para a área administrativa
          if (type === 'login') {
            this.router.navigate(['/admin']);
          }
      },
      error: (err: any) => {
        const msg = err.error?.message || "Servidor offline ou erro de credenciais.";
        alert("Erro: " + msg);
      }
    });
  }
}
