import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
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

  email = '';
  password = '';
  errorMessage = '';
  constructor(private loginService: LoginService, private router: Router){}

  onSubmit() {
    if (this.email === 'admin@email.com' && this.password === 'batata') {
      this.loginService.setUsuarioLogado(this.email);
      this.router.navigate(["/"])
    } else {
      this.errorMessage = 'Credenciais inválidas';
    }
  }
  irParaCadastro(event: Event) {
    event.preventDefault();
    this.router.navigate(["/cadastro"])
  }
  fechar(){
    this.router.navigate(["/"])
  }
}
