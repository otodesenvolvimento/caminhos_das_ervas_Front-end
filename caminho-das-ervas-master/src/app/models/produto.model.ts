import { CategoriaType } from "../types/categoria.type";

export interface produtoModel
{
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    categoria: CategoriaType;
}