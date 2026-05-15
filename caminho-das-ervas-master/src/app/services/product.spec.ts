import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly API_URL = '/api'; // O proxy redireciona para http://127.0.0.1:5000

  constructor(private http: HttpClient) {}

  // Listar produtos (Público)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products`);
  }

  // Login (Necessário para gerar o cookie de admin)
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials, {
      withCredentials: true // Permite que o navegador salve o cookie de sessão
    });
  }

  // Criar produto (Protegido por check_admin no Flask)
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}/products`, product, {
      withCredentials: true // Envia o cookie de admin para o servidor[cite: 1]
    });
  }
}
