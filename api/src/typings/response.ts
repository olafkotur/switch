export interface IResponse {
  code: number;
  status: string;
  date: string;
  unix: number;
  message?: string;
  data?: unknown;
}
