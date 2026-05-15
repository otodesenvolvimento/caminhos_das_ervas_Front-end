import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { ProdutoComponent } from '../produto/produto.component';
import { CommonModule } from '@angular/common';
import { produtoModel } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CategoriaType } from '../../types/categoria.type';
import { FiltroProdutoService } from '../../services/filtro-produto-service';
import { ProdutoDetalheComponent } from '../produto-detalhe/produto-detalhe';


@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ProdutoComponent, ProdutoDetalheComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
})
export class ProdutosComponent implements OnInit {
 filtroProdutos: CategoriaType | null | "todos" = "todos";
  termoAtual: string = "";
  produtos: produtoModel[] = [];
  produtosFiltrados: produtoModel[] = [];
  produtoSelecionado: produtoModel | null = null;

  constructor(private produtoService: ProdutoService, private filtroService: FiltroProdutoService) {}

ngOnInit(): void {
    // 1. Carrega os produtos iniciais
    this.produtoService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
      this.executarFiltragemCombinada();
      document.body.style.overflow = 'auto'

    });

    // 2. Ouve mudanças na categoria
    this.filtroService.FiltroAtual$.subscribe(filtro => {
      this.filtroProdutos = filtro;
      this.executarFiltragemCombinada();
    });

    // 3. Ouve mudanças na pesquisa por texto
    this.filtroService.termoPesquisa$.subscribe(termo => {
      this.termoAtual = termo.toLowerCase();
      this.executarFiltragemCombinada();
    });
  }
  executarFiltragemCombinada() {
    this.produtosFiltrados = this.produtos.filter(produto => {
      // Filtro por Categoria
      const passaCategoria = (this.filtroProdutos === null || this.filtroProdutos === "todos")
        ? true
        : produto.categoria === this.filtroProdutos;

      // Filtro por Texto (Nome ou Descrição)
      const nome = produto.name.toLowerCase();
      const desc = produto.description ? produto.description.toLowerCase() : "";
      const passaTexto = nome.includes(this.termoAtual) || desc.includes(this.termoAtual);

      return passaCategoria && passaTexto;
    });
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
  abrirDetalhes(produto: produtoModel) {
  this.produtoSelecionado = produto;
  // Trava o scroll da página principal
  document.body.style.overflow = 'hidden';
}
fecharDetalhe() {
  this.produtoSelecionado = null;
  // Restaura o scroll da página principal
  document.body.style.overflow = 'auto';
}
}
