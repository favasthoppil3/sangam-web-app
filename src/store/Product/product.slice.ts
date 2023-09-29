import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Products, ProductsState } from '@/types/products';
import { checkedProduct, fetchProductsList } from './product.thunks';

const initialState: ProductsState = {
  productListData: {
    status: 'success',
    // data: {
    //   category1: [],

    //   category2: [],

    //   category3: [],
    // },
    data: [
      { id: 1, productName: 'Apple', checked: false, inputDisabled: true, inputValue: '' },
      { id: 2, productName: 'Banana', checked: false, inputDisabled: true, inputValue: '' },
      { id: 3, productName: 'Orange', checked: false, inputDisabled: true, inputValue: '' },
      { id: 4, productName: 'Mango', checked: false, inputDisabled: true, inputValue: '' },
      { id: 5, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
      { id: 6, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
      { id: 7, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
      { id: 8, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
      { id: 9, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
      { id: 10, productName: 'Grapes', checked: false, inputDisabled: true, inputValue: '' },
    ],
    error: null,
  },
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsList: (state, action: PayloadAction<Products[]>) => {
      state.productListData.data = action.payload;
    },
    setCheckedProducts: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      console.log('id', productId);
      const productIndex = state.productListData.data.findIndex((product) => product.id === productId);
      if (productIndex !== -1) {
        const product = state.productListData.data[productIndex];
        state.productListData.data[productIndex] = {
          ...product,
          checked: !product.checked,
          inputDisabled: !product.inputDisabled,
        };
      }
    },
    setInputValues: (state, action: PayloadAction<{ productId: number; productCount: string }>) => {
      state.productListData.data = state.productListData.data.map((product) =>
        product.id === action.payload.productId ? { ...product, inputValue: action.payload.productCount } : product
      );
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchProductsList.pending, (state) => {
        state.productListData.status = 'loading';
        state.productListData.error = null;
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.productListData.status = 'success';
        state.productListData.data = data;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.productListData.status = 'error';
        state.productListData.error = action.payload || 'Unknown error in fetching Products List';
      })
      .addCase(checkedProduct.pending, (state) => {
        state.productListData.error = null;
      })
      .addCase(checkedProduct.fulfilled, (state, action) => {
        state.productListData.error = null;
      })
      .addCase(checkedProduct.rejected, (state, action) => {
        state.productListData.error = action.payload || 'Unknown error in fetching Products List';
      });
  },
});

export const { setProductsList, setCheckedProducts, setInputValues } = productSlice.actions;

export const getProductsList = (state: RootState) => state.productList.productListData.data;
export const getProductsListStatus = (state: RootState) => state.productList.productListData.status;
export const getCheckedProducts = (state: RootState) =>
  state.productList.productListData.data.filter((product) => product.checked);

export default productSlice.reducer;
