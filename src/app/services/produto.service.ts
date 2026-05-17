import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { produtoModel } from '../models/produto.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // <-- IMPORTAÇÃO DO AMBIENTE

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl: string;

  constructor(private http: HttpClient) { 
    // Validação inteligente da URL de produtos
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      this.apiUrl = 'http://localhost:5000/products';
    } else {
      this.apiUrl = `${environment.apiUrl}/products`;
    }
  }

  getProdutos(): Observable<produtoModel[]> {
    return this.http.get<produtoModel[]>(this.apiUrl);
  }
}
