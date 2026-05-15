import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Objeto tipado para evitar erros de compilação
  public usuario = {
    username: '',
    password: ''
  };

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  public onLogin(): void {
    // Verifica se os campos estão preenchidos antes de chamar a API
    if (!this.usuario.username || !this.usuario.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.loginService.logar(this.usuario).subscribe({
      next: (res) => {
        console.log('Login realizado com sucesso!', res);

        // Guarda as informações do usuário logado
        localStorage.setItem('user_info', JSON.stringify(res));

        // Redireciona para a página inicial
        this.router.navigate(['/']);
      },
      error: (err) => {
        // Exibe mensagem amigável dependendo do erro da API
        const mensagem = err.status === 401
          ? 'Usuário ou senha incorretos.'
          : 'Erro na conexão com o servidor.';

        alert(mensagem);
        console.error('Erro no login:', err);
      }
    });
  }

  public irParaCadastro(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/cadastro']);
  }

  public fechar(): void {
    this.router.navigate(['/']);
  }
}
