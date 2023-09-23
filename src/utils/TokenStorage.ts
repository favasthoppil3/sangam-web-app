import { TokenStoragekey } from '@/config/constants';

const storageKey = TokenStoragekey;

const TokenStorage = {
  getAccessToken: () => {
    if (window.localStorage) {
      return window.localStorage.getItem(storageKey);
    }
    return null;
  },
  setAccessToken: (token: string) => {
    if (window.localStorage) {
      window.localStorage.setItem(storageKey, token);
    }
  },
  clearAccessToken: () => {
    if (window.localStorage) {
      window.localStorage.removeItem(storageKey);
    }
  },
};

export default TokenStorage;
