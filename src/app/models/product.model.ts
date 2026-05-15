import { CategoriaType } from "../types/categoria.type";

// src/app/models/product.model.ts
export interface Product {
  id?: number;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  image_path?: string;
  categoria: string; // 👈 Certifique-se de que esta linha existe
}
