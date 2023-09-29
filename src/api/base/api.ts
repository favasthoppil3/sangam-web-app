/* eslint-disable no-useless-catch */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Api, APIError, APIResponse, ErrorDescripion } from '@/api/base/types';
import ApiUrls from '@/config/ApiUrls';

export class ApiResponseError extends Error {
  public response: APIError;

  constructor(message: string, response: APIError) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
  }
}

const apiClient = axios.create({
  baseURL: ApiUrls.BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorResponse: APIError = {};

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('Interceptor for error');
      errorResponse.data = error.response.data as ErrorDescripion | undefined;
      errorResponse.status = error.response.status;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      errorResponse.status = 500;
      errorResponse.data = { errorMessage: 'Something went wrong' };
    } else {
      // Something happened in setting up the request that triggered an Error
      errorResponse.status = 500;
      errorResponse.data = { errorMessage: error.message };
    }
    return Promise.reject(new ApiResponseError(error.message, errorResponse));
  }
);

const logErrors = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

const api: Api = {
  get: async <T = any>(url: string, config?: any): Promise<APIResponse<T>> => {
    try {
      const response = await apiClient.get<T>(url, config);
      return { status: response.status, data: response.data };
    } catch (error: unknown) {
      logErrors(error as AxiosError);
      throw error;
    }
  },
  post: async <T = any, D = any>(url: string, data: D, config?: any): Promise<APIResponse<T>> => {
    try {
      const response = await apiClient.post<T, AxiosResponse<T>, D>(url, data, config);
      return { status: response.status, data: response.data };
    } catch (error: unknown) {
      // logErrors(error as AxiosError);
      throw error;
    }
  },
  put: async <T = any, D = any>(url: string, data: D, config?: any): Promise<APIResponse<T>> => {
    try {
      const response = await apiClient.put<T, AxiosResponse<T>, D>(url, data, config);
      return { status: response.status, data: response.data };
    } catch (error: unknown) {
      logErrors(error as AxiosError);
      throw error;
    }
  },
  patch: async <T = any, D = any>(url: string, data: D, config?: any): Promise<APIResponse<T>> => {
    try {
      const response = await apiClient.patch<T, AxiosResponse<T>, D>(url, data, config);
      return { status: response.status, data: response.data };
    } catch (error: unknown) {
      logErrors(error as AxiosError);
      throw error;
    }
  },
  delete: async <T = any>(url: string, config?: any): Promise<APIResponse<T>> => {
    try {
      const response = await apiClient.delete<T>(url, config);
      return { status: response.status, data: response.data };
    } catch (error: unknown) {
      logErrors(error as AxiosError);
      throw error;
    }
  },
};

export default api;
