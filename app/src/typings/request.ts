export type IRequestMethod = 'get' | 'post' | 'put' | 'delete'

export interface IRequestHeaders {
  [key: string]: string
}

export interface IRequestOptions {
  url: string
  method: IRequestMethod
  // tslint:disable-next-line: no-any
  body?: string
  headers?: IRequestHeaders
}
