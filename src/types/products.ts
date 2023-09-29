import { FetchStatus } from './common';

export interface Products {
  id: number;
  productName: string;
  checked: boolean;
  inputDisabled: boolean;
  inputValue: string;
}
export type ProductsState = {
  productListData: {
    status: FetchStatus;
    data: Products[];
    error: string | null;
  };
};
