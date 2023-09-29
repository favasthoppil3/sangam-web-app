import api from '@/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchProducts } from './apiP';

// export const fetchProductsList = createAsyncThunk<any, any, { rejectValue: string }>(
//   'product',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.Products.GetProductList;
//       return response.data;
//     } catch {
//       return rejectWithValue('Something went wrong in fetching Product List');
//     }
//   }
// );
export const fetchProductsList = createAsyncThunk('products/fetchProductsList', async () => {
  const products = await fetchProducts();
  return products;
});
export const checkedProduct = createAsyncThunk<any, any, { rejectValue: string }>(
  'product/checked',
  async (request, { rejectWithValue }) => {
    try {
      const response = await api.Products.GetProductList(request);
      return response.data;
    } catch {
      return rejectWithValue('Something went wrong in updating product checked');
    }
  }
);
