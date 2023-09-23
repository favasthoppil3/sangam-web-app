import ApiUrls from '@/config/apiUrls';
import { LoginRequest, LoginResponse } from '@/types/Auth';
import api from './base/api';
import { APIResponse } from './base/types';

async function Login(loginRequest: LoginRequest): Promise<APIResponse<LoginResponse>> {
  const response = await api.post<LoginResponse>(ApiUrls.LoginUrl, loginRequest);
  return response;
}

const methods = {
  Login,
};

export default methods;
