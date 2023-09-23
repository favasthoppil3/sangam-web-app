export enum StatusCodes {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  MovedPermanently = 301,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  PayloadTooLarge = 413,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

export const TokenStoragekey = 'pdak';

export const defaultSettings = {
  themeMode: 'light',
  themeColorPresets: 'orange',
};

export const TOP_BAR_HEIGHT = '4rem';
export const TOP_TAB_HEIGHT = '3rem';
export const SIDE_BAR_WIDTH = '15.625rem';
