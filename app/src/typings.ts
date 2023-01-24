export interface User {
  username: string;
  avatar: string;
}

export interface Module {
  id: string;
  url: string;
  favicon: string;
}

export interface Response {
  code: number;
  status: string;
  date: string;
  unix: number;
  message?: string;
  data?: unknown;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
