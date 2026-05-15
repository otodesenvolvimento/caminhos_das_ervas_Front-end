import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { SecaoSiteType } from '../../types/secao.type';
import { Router } from '@angular/router';
import { FiltroProdutoService } from '../../services/filtro-produto-service';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css',
})
export class CabecalhoComponent implements OnInit {
  usuarioLogado: string | null = null;

  isDropdownOpen = false;

  constructor(private router: Router, private filtrosService: FiltroProdutoService, private loginService: LoginService) {}
  
  ngOnInit(): void {
    this.loginService.usuarioLogado$.subscribe((email)=>{
      this.usuarioLogado = email;
    })
  }
  logout(){
    this.loginService.logout();    
  }


  abrirLogin(event: Event){
    event.preventDefault(); 
    console.log("clicou no login");
    this.router.navigate(['/login'])
  }

  paginaAtual: SecaoSiteType = "paginaInicial";
  toggleDropdown(open: boolean) {
    this.isDropdownOpen = open;
  }

  setPaginaAtual(secao: SecaoSiteType){
    console.log('setPagina Atual: ',secao)
    this.paginaAtual = secao;
    if(secao=="paginaInicial")
      this.router.navigate(["/"]); 
    else{
      this.filtrosService.setFiltro(secao);
      this.router.navigate(["/produtos"]); 
    }
      
  }
}
