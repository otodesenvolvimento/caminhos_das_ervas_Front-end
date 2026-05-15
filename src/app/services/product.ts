import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Conexão direta com o Flask
  private readonly API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // Listar produtos (Agora com a permissão de credenciais ativada!)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products`, {
      withCredentials: true
    });
  }

  // Login
 // login(credentials: any): Observable<any> {
///return this.http.post(`${this.API_URL}/login`, credentials, { withCredentials: true });
//  }
login(data: any) {
  return this.http.post(
    'http://localhost:5000/login',
    data,
    { withCredentials: true }
  );
}
  // Registro
  register(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, credentials, { withCredentials: true });
  }

// No seu ficheiro product.ts, substitua o createProduct por este:
addProduct(product: any): Observable<any> {
  const productData = {
    name: product.name,
    description: product.description,
    quantity: product.quantity,
    price: Number(product.price), // Garante que é número
    image_path: product.image_path,
    categoria: product.categoria
  };

  return this.http.post(`${this.API_URL}/products`, productData, {
    withCredentials: true
  });
}

  // Excluir produto
// No arquivo app/services/product.ts
//deleteProduct(id: number): Observable<any> {
  // Verifique se a URL usa crases (backticks) e plural 'products'
//  return this.http.delete(`${this.API_URL}/products/${id}`, {
 //   withCredentials: true // 🛡️ OBRIGATÓRIO para o check_admin() funcionar
 // });
//}
deleteProduct(id: number) {
  return this.http.delete(
    `http://localhost:5000/products/${id}`,
    { withCredentials: true }
  );
}
getProduct(id: number) {
  return this.http.get(
    `http://localhost:5000/products/${id}`,
    {
      withCredentials: true
    }
  );
}

  // Editar produto
// app/services/product.ts
// app/services/product.ts
// updateProduct(id: number, product: any): Observable<any> {
//   const productData = {
//     name: product.name,
//     description: product.description,
//     quantity: product.quantity,
//     price: Number(product.price), // 🛡️ Garante tipo numérico para evitar 422
//     image_path: product.image_path
//   };

//   return this.http.put(`${this.API_URL}/products/${id}`, productData, {
//     withCredentials: true // Essencial para o check_admin()
//   });
// }
// src/app/services/product.ts

updateProduct(id: number, product: any): Observable<any> {
  // Criamos um objeto NOVO apenas com os campos que o Flask aceita no ProductIn
  const productData = {
    name: product.name,
    description: product.description,
    quantity: product.quantity,
    price: Number(product.price), // 🛡️ Garante que é um número (evita erro 422)
    image_path: product.image_path,
    categoria: product.categoria
  };

  console.log('Enviando dados limpos para o Flask:', productData);

  // O ID vai apenas na URL, nunca no corpo (productData)
  return this.http.put(`http://localhost:5000/products/${id}`, productData, {
    withCredentials: true // 🛡️ Necessário para validar que és Admin no Flask
  });
}

// Adicione ao seu ProductService em app/services/product.ts
getCurrentUser(): Observable<any> {
  return this.http.get(`${this.API_URL}/me`, {
    withCredentials: true // 🛡️ Essencial para o Flask reconhecer quem é você
  });
}
  uploadImage(file: File): Observable<{image_path: string}> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<{image_path: string}>(`${this.API_URL}/upload`, formData, {
    withCredentials: true
  });
}

}
