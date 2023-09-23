// function path(root: string, subPath: string) {
//   return `${root}${subPath}`;
// }

const API_BASE_URL = import.meta.env.VITE_API_BASEURL;

const urls = {
  BaseUrl: API_BASE_URL,
  LoginUrl: '/api/login',
};

export const AnonymousUrls = [urls.LoginUrl];

export default urls;
