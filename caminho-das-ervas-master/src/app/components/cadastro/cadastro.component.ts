import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';// Importe o Router para redirecionar após o cadastro

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  @Output() cadastroSucesso = new EventEmitter<void>()



  constructor(private router: Router) {}



  // Esta é a função que estava faltando:
  registrarUsuario() {
    console.log('Iniciando processo de cadastro...');

    alert('Cadastro realizado com sucesso!');
    this.cadastroSucesso.emit();

    this.router.navigate(['/login']);
  }

  irParaLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(["/login"]);
  }



}
