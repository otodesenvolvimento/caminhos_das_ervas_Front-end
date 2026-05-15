import { Injectable } from '@angular/core';
import { produtoModel } from '../models/produto.model';
import { carrinhoModel } from '../models/carrinho.model';



@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itens: carrinhoModel[] = [];

  constructor() {}

  adicionarAoCarrinho(produto: produtoModel) {
    const itemExistente = this.itens.find(item => item.produto.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      const itemCarrinho: carrinhoModel = {
        quantidade: 1,
        produto: produto
      }
      this.itens.push(itemCarrinho);
    }
  }

  getItens(): carrinhoModel[] {
    return this.itens;
  }

  getQuantidadeTotal(): number {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  incrementarQuantidade(id: number) {
    const item = this.itens.find(i => i.produto.id === id);
    if (item) {
      item.quantidade++;
    }
  }

  decrementarQuantidade(id: number) {
    const item = this.itens.find(i => i.produto.id === id);
    if (item) {
      if (item.quantidade > 1) {
        item.quantidade--;
      } else {
        const index = this.itens.findIndex(i => i.produto.id === id);
        this.removerItem(index);
      }
    }
  }

  limparCarrinho() {
    this.itens = [];
    return this.itens;
  }

  getPrecoTotal() {
    return this.itens.reduce((total, atual) => {
      return total + (atual.produto.price * atual.quantidade);
    }, 0);
  }

  removerItem(index: number) {
    this.itens.splice(index, 1);
  }
}
