export interface ModelBase {
  updatedAt: Date;
  createdAt: Date;
}

export interface JwtAuthData {
  username: string;
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
