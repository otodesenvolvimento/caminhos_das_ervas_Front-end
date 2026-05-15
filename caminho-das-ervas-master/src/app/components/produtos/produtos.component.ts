import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProdutoComponent } from '../produto/produto.component';
import { CommonModule } from '@angular/common';
import { produtoModel } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CategoriaType } from '../../types/categoria.type';
import { FiltroProdutoService } from '../../services/filtro-produto-service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ProdutoComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
})
export class ProdutosComponent implements OnInit {
  filtroProdutos!: CategoriaType | null | "todos";
  produtos: produtoModel[] = []
  produtosFiltrados: produtoModel[] = []

  constructor(private produtoService: ProdutoService, private filtroService: FiltroProdutoService) {}

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe((produtos)=>{
        this.produtos = produtos 
        this.aplicarfiltro(this.filtroProdutos)
    });
    this.filtroService.FiltroAtual$.subscribe(filtro=>{
      this.filtroProdutos = filtro;
      this.aplicarfiltro(filtro);
    })
  }
  aplicarfiltro(filtro: CategoriaType | null | "todos"){
    if(filtro == null || filtro == "todos") {
      this.produtosFiltrados = this.produtos
    }
    else{
      this.produtosFiltrados = this.produtos.filter((produto)=>{
        return produto.categoria == filtro
      })
    }
  }
}
