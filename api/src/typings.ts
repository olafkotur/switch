import { Types } from 'mongoose';

export type SuggestionCategory = 'productivity' | 'social' | 'messaging';

export interface ModelBase {
  _id: Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
}

export interface JwtAuthData {
  email: string;
  password: string;
  iat?: number;
  exp?: number;
}

/***** RESPONSE ******/
export interface Response {
  code: number;
  status: string;
  date: string;
  unix: number;
  message?: string;
  data?: unknown;
}

export interface JwtResponse {
  data: JwtAuthData;
  error?: string;
}

export interface JwtRefreshResponse {
  accessToken: string;
  refreshToken: string;
}
