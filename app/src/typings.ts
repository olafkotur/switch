import { Theme } from './style/theme';

export interface User {
  username: string;
  avatar: string;
}

export interface Module {
  _id: string;
  userId: string;
  url: string;
  icon: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Preference {
  _id: string;
  userId: string;
  theme: Theme;
  updatedAt: Date;
  createdAt: Date;
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
