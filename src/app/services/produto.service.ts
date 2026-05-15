import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa o HttpClient
import { produtoModel } from '../models/produto.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // URL base do seu servidor Flask (conforme definido no app.py)
  private apiUrl = 'http://localhost:5000/products';

  constructor(private http: HttpClient) { }

  // Retorna um Observable que o componente vai "escutar"
  getProdutos(): Observable<produtoModel[]> {
    return this.http.get<produtoModel[]>(this.apiUrl);
  }
}
