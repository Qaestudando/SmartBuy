export type PriceModality = "ONLINE" | "LOJA_FISICA";

export interface ShoppingItem {
  produto: string;
  quantidade: number;
  unidade: string;
  marca?: string;
}

export interface PriceResult {
  produto: string;
  marca?: string;

  quantidade: number;
  unidade: string;

  supermercado: string;
  loja?: string;

  modalidade: PriceModality;

  preco: number;
  precoAnterior?: number;

  dataColeta: string;
  validadeOferta?: string;

  urlProduto?: string;
}