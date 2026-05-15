import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SecaoSiteType } from '../../types/secao.type';
import { Router, RouterLink } from '@angular/router';

import { FiltroProdutoService } from '../../services/filtro-produto-service';
import { LoginService } from '../../services/login-service';
import { AdminModalService } from '../../services/admin-modal.service'

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule],
  //imports: [CommonModule, RouterLink],


  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css',
})
export class CabecalhoComponent implements OnInit {
  usuarioLogado: string | null = null;
  isDropdownOpen = false;
  paginaAtual: SecaoSiteType = "paginaInicial";

  constructor(
    public adminService: AdminModalService,
    private router: Router,
    private filtrosService: FiltroProdutoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado$.subscribe((user) => {
      this.usuarioLogado = user;
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/']); // Volta para a home após sair
  }

  abrirLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  toggleDropdown(open: boolean): void {
    this.isDropdownOpen = open;
  }

  setPaginaAtual(secao: SecaoSiteType): void {
    this.paginaAtual = secao;
    if (secao === "paginaInicial") {
      this.router.navigate(["/"]);
    } else {
      this.filtrosService.setFiltro(secao);
      this.router.navigate(["/produtos"]);
    }
  }
  pesquisar(event: any): void {
  const valor = event.target.value;
  this.filtrosService.setTermoPesquisa(valor);

  // Se o usuário pesquisar fora da página de produtos, redireciona para lá
  if (this.router.url !== '/produtos') {
    this.router.navigate(['/produtos']);
  }
}
}
