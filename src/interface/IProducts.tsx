import type { IProductsPrice } from "./IProductsPrice";

interface IProducts {
  code : number;
  codeProducts : string;
  name : string;
  barcode : string;
  presentation : string;
  category : string;
  isService : boolean;
  stock : number;
  price : number;
  isLote : boolean;
  lote : string | null;
  dateLote : string | null;
  prices : IProductsPrice[] | null;
  isActive : boolean;
  state : string;
  date: string;
  user: number;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}

export type { IProducts };
