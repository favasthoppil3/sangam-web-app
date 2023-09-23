export interface User {
  id: number;
  name: string;
  displayName: string;
  roles: string[];
  photo?: string;
}

export type AuthContextState = {
  method: string;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
};

export type AuthActionPayload = Omit<Partial<AuthContextState>, 'method' | 'login' | 'logout'>;
export type AuthAction = {
  type: string;
  payload?: AuthActionPayload;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accesstoken: string;
  user: User;
};
