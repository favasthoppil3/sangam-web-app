import ApiUrls from '@/config/ApiUrls';
import { APIResponse } from './base/types';
import api from './base/api';

async function GetProductList(): Promise<APIResponse<any>> {
  const response = await api.get<any>(ApiUrls.ProductList);
  return response;
}
const methods = {
  GetProductList,
};

export default methods;
