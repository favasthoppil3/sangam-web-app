import AuthAPI from '@/api/Auth';
import { ApiResponseError } from '@/api/base/api';
import { StatusCodes } from '@/config/constants';
import { GetActiveUserAccount } from '@/utils/Auth';
import TokenStorage from '@/utils/TokenStorage';
import { AuthAction, AuthContextState, LoginRequest, User } from '@/types/Auth';
import { createContext, ReactNode, Reducer, useCallback, useEffect, useMemo, useReducer } from 'react';

const initialState: AuthContextState = {
  method: 'custom',
  isAuthenticated: false,
  isInitialized: false,
  loading: false,
  error: null,
  user: null,
  login: () => Promise.resolve(),
  logout: () => {},
};

const handlers: { [K in string]: Reducer<AuthContextState, AuthAction> } = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload!;
    return { ...state, isAuthenticated: !!isAuthenticated, isInitialized: true, user: user || null };
  },
  LOGIN_START: (state) => {
    return { ...state, isAuthenticated: false, user: null, loading: true, error: null };
  },
  LOGIN_SUCCESS: (state, action) => {
    return { ...state, isAuthenticated: true, user: action.payload!.user!, loading: false, error: null };
  },
  LOGIN_ERROR: (state, action) => {
    return { ...state, isAuthenticated: false, user: null, loading: false, error: action.payload!.error! };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
  }),
};

const rootReducer: Reducer<AuthContextState, AuthAction> = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext(initialState);

export type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const activeAccount: User | null = GetActiveUserAccount();
        const isAuthenticated = activeAccount !== null;
        if (isAuthenticated) {
          dispatch({
            type: 'INITIALIZE',
            payload: { isAuthenticated, user: activeAccount, loading: false, error: null },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: { isAuthenticated, user: null, loading: true, error: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    initialize();
  }, []);

  const login = useCallback(async (request: LoginRequest) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await AuthAPI.Login(request);
      if (response.status === StatusCodes.Ok) {
        const loginResponse = response.data;
        TokenStorage.setAccessToken(loginResponse.accesstoken);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: loginResponse.user } });
      } else {
        TokenStorage.clearAccessToken();
        dispatch({ type: 'LOGIN_ERROR', payload: { error: 'Unexpected error in login' } });
      }
    } catch (e) {
      TokenStorage.clearAccessToken();
      if (e instanceof ApiResponseError) {
        const errorResponse = e.response;
        if (errorResponse && !!errorResponse.data) {
          dispatch({ type: 'LOGIN_ERROR', payload: { error: errorResponse.data.errorMessage } });
        } else {
          dispatch({ type: 'LOGIN_ERROR', payload: { error: 'Something went wrong in login' } });
        }
      } else {
        dispatch({ type: 'LOGIN_ERROR', payload: { error: 'Something went wrong in login' } });
      }
    }
  }, []);

  const logout = useCallback(() => {
    TokenStorage.clearAccessToken();
    dispatch({ type: 'LOGOUT' });
  }, []);

  const authMemoizedState = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [login, logout, state]
  );

  return <AuthContext.Provider value={authMemoizedState}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
