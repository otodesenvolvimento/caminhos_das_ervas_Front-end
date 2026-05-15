import { produtoModel } from "./produto.model";

export interface carrinhoModel
{
    produto: produtoModel
    quantidade: number;
}