import { CategoriaType } from "../types/categoria.type";
// src/app/models/product.model.ts
export interface produtoModel { // 👈 Mudamos de 'Product' para 'produtoModel'
  id?: number;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  image_path?: string;
  categoria: string;
}
