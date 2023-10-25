import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Category1Products, ProductsState } from '@/types/products';
import { checkedProduct, fetchProductsList } from './product.thunks';

const initialState: ProductsState = {
  productListData: {
    status: 'success',
    data: {
      category1: [
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

      category2: [
        { id: 11, productName: 'Iphone', checked: false, inputDisabled: true, inputValue: '', selectBox: '' },
        { id: 12, productName: 'Samsung', checked: false, inputDisabled: true, inputValue: '', selectBox: '' },
        { id: 13, productName: 'Redmi', checked: false, inputDisabled: true, inputValue: '', selectBox: '' },
        { id: 14, productName: 'Oppo', checked: false, inputDisabled: true, inputValue: '', selectBox: '' },
        { id: 15, productName: 'Vivo', checked: false, inputDisabled: true, inputValue: '', selectBox: '' },
        { id: 16, productName: 'Realme', checked: false, inputDisabled: true, inputValue: '', selectBox: '' },
      ],

      category3: [],
    },
    checkedProduct: [],
    // data: [],
    error: null,
  },
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsList: (state, action: PayloadAction<Category1Products[]>) => {
      state.productListData.data.category1 = action.payload;
    },
    setCategory1CheckedProducts: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const checkeditems = [];
      console.log('id', productId);
      const productIndex = state.productListData.data.category1.findIndex((product) => product.id === productId);
      if (productIndex !== -1) {
        const product = state.productListData.data.category1[productIndex];
        state.productListData.data.category1[productIndex] = {
          ...product,
          checked: !product.checked,
          inputDisabled: !product.inputDisabled,
        };
      }
      state.productListData.checkedProduct = [
        ...state.productListData.data.category1.filter((product) => product.checked),
        ...state.productListData.data.category2.filter((product) => product.checked),
      ];
      console.log('checked', state.productListData.checkedProduct);
    },
    setCategory1InputValues: (state, action: PayloadAction<{ productId: number; productCount: string }>) => {
      state.productListData.data.category1 = state.productListData.data.category1.map((product) =>
        product.id === action.payload.productId ? { ...product, inputValue: action.payload.productCount } : product
      );
    },
    setCategory2CheckedProducts: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      console.log('id', productId);
      const productIndex = state.productListData.data.category2.findIndex((product) => product.id === productId);
      if (productIndex !== -1) {
        const product = state.productListData.data.category2[productIndex];
        state.productListData.data.category2[productIndex] = {
          ...product,
          checked: !product.checked,
          inputDisabled: !product.inputDisabled,
        };
      }
      state.productListData.checkedProduct = [
        ...state.productListData.data.category1.filter((product) => product.checked),
        ...state.productListData.data.category2.filter((product) => product.checked),
      ];
    },
    setCategory2InputValues: (state, action: PayloadAction<{ productId: number; productCount: string }>) => {
      state.productListData.data.category2 = state.productListData.data.category2.map((product) =>
        product.id === action.payload.productId ? { ...product, inputValue: action.payload.productCount } : product
      );
    },
    setSelectInputValues: (state, action: PayloadAction<{ productId: number; productKg: string }>) => {
      state.productListData.data.category2 = state.productListData.data.category2.map((product) =>
        product.id === action.payload.productId ? { ...product, selectBox: action.payload.productKg } : product
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
        const data = action.payload;
        state.productListData.status = 'success';
        state.productListData.data = data;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.productListData.status = 'error';
        state.productListData.error = 'Unknown error in fetching Products List';
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

export const {
  setProductsList,
  setCategory1CheckedProducts,
  setCategory1InputValues,
  setCategory2InputValues,
  setCategory2CheckedProducts,
  setSelectInputValues,
} = productSlice.actions;

export const getCategory1ProductsList = (state: RootState) => state.productList.productListData.data.category1;
export const getCategory2ProductsList = (state: RootState) => state.productList.productListData.data.category2;
export const getProductsListStatus = (state: RootState) => state.productList.productListData.status;
export const getC2InputValue = (state: RootState) => state.productList.productListData.data.category2;
export const getAllCategoryCheckedProducts = (state: RootState) => state.productList.productListData.checkedProduct;
// export const getCategory2CheckedProducts = (state: RootState) =>
//   state.productList.productListData.data.category2.filter((product) => product.checked);

export default productSlice.reducer;
