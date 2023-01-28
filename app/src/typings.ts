import { Themes } from './style/theme';

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
  theme: Themes;
  overlayMode: boolean;
  animatePresets: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface Suggestion {
  _id: string;
  url: string;
  icon: string;
  category: 'productivity' | 'social' | 'messaging';
  updatedAt: Date;
  createdAt: Date;
}
