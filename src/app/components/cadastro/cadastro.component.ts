import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  @Output() cadastroSucesso = new EventEmitter<void>();

  // Usei 'usuario' para manter a consistência, mas adicionei 'confirmarSenha'
  // para que o HTML não dê erro de propriedade inexistente.
  public usuario = {
    username: '',
    password: '',
    confirmarSenha: ''
  };

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  // Função chamada pelo (ngSubmit) no seu HTML
  public registrarUsuario(): void {
    console.log('Iniciando processo de cadastro...', this.usuario);

    // Validação de campos vazios
    if (!this.usuario.username || !this.usuario.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Validação de confirmação de senha
    if (this.usuario.password !== this.usuario.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    // Envia para o Flask via LoginService
    this.loginService.cadastrar(this.usuario).subscribe({
      next: (res) => {
        alert('Cadastro realizado com sucesso!');
        this.cadastroSucesso.emit();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        const msg = err.status === 400 ? 'Usuário já existe.' : 'Erro no servidor.';
        alert(msg);
      }
    });
  }

  public irParaLogin(event: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/login']);
  }
}
