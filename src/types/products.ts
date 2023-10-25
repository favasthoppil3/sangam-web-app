import { FetchStatus } from './common';

export interface Category1Products {
  id: number;
  productName: string;
  checked: boolean;
  inputDisabled: boolean;
  inputValue: string;
}
export interface Category2Products {
  id: number;
  productName: string;
  checked: boolean;
  inputDisabled: boolean;
  inputValue: string;
  selectBox: string;
}
export type ProductsState = {
  productListData: {
    status: FetchStatus;
    // data: Products[];
    data: { category1: Category1Products[]; category2: Category2Products[]; category3: Products[] };
    checkedProduct: Category1Products[];
    error: string | null;
  };
};
