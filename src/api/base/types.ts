import { GenericAbortSignal } from 'axios';

export type ErrorDescripion = {
  errorCode?: string;
  errorMessage: string;
};

export type APIError = {
  status?: number;
  data?: ErrorDescripion;
};

export type APIResponse<T> = {
  status: number;
  data: T;
  error?: APIError;
};

export type GenericAPIConfig = any & { cancelSignal?: GenericAbortSignal };

export type Api = {
  get: <T = any>(url: string, config?: GenericAPIConfig) => Promise<APIResponse<T>>;
  delete: <T = any>(url: string, config?: GenericAPIConfig) => Promise<APIResponse<T>>;
  post: <T = any, D = any>(url: string, data?: D, config?: GenericAPIConfig) => Promise<APIResponse<T>>;
  put: <T = any, D = any>(url: string, data?: D, config?: GenericAPIConfig) => Promise<APIResponse<T>>;
  patch: <T = any, D = any>(url: string, data?: D, config?: GenericAPIConfig) => Promise<APIResponse<T>>;
};
