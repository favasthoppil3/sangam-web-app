import TokenStorage from '@/utils/TokenStorage';
import { User } from '@/types/Auth';

export function GetActiveUserAccount() {
  try {
    const tokenInStorage = TokenStorage.getAccessToken();
    if (tokenInStorage) {
      const userObj = JSON.parse(window.atob(tokenInStorage)) as User;
      if (userObj.id > 0) {
        return userObj;
      }
      return null;
    }
    return null;
  } catch {
    return null;
  }
}
