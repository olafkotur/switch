export interface IAuth {
  username: string
  password: string
  iat?: number
  exp?: number
}

export interface JwtResponse {
  data: IAuth
  error?: string
}
