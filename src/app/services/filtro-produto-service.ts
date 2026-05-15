import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoriaType } from '../types/categoria.type';

@Injectable({
  providedIn: 'root',
})
export class FiltroProdutoService {

  private FiltroAtual: BehaviorSubject<"todos" | CategoriaType | null> = new BehaviorSubject<"todos" | CategoriaType | null>(null);

  // 1. Adicione esta linha para criar o Subject da pesquisa
  private termoPesquisa = new BehaviorSubject<string>('');

  get FiltroAtual$ (){
    return this.FiltroAtual;
  }

  // 2. Adicione este getter para que os componentes possam "ouvir" a pesquisa
  get termoPesquisa$() {
    return this.termoPesquisa.asObservable();
  }

  setFiltro(filtro: "todos" | CategoriaType) {
    this.FiltroAtual.next(filtro);
  }

  // 3. Adicione este método para atualizar o valor
  setTermoPesquisa(termo: string) {
    this.termoPesquisa.next(termo);
  }
}
