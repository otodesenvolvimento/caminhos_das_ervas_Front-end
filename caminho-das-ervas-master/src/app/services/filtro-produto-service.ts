import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoriaType } from '../types/categoria.type';

@Injectable({
  providedIn: 'root',
})
export class FiltroProdutoService {

  private FiltroAtual: BehaviorSubject<"todos" | CategoriaType | null> = new BehaviorSubject<"todos" | CategoriaType | null>(null);

  get FiltroAtual$ (){
    return this.FiltroAtual;
  }

  setFiltro(filtro: "todos" | CategoriaType) {
    this.FiltroAtual.next(filtro);
  }
}
