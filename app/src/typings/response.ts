export interface IResponse {
  // tslint:disable-next-line: no-any
  result: IResponseResult;
  headers: Headers;
}

export interface IResponseResult {
  code: number;
  status: string;
  date: string;
  unix: number;
  message?: string;
  data?: unknown;
}
