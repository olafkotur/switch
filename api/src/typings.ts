export interface ModelBase {
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

export interface JwtAuthData {
  username: string;
  password: string;
  iat?: number;
  exp?: number;
}

export interface JwtResponse {
  data: JwtAuthData;
  error?: string;
}
