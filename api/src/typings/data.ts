export interface IAuth {
  email: string
  password: string
  iat?: number
  exp?: number
}

export interface JwtResponse {
  data: IAuth
  error?: string
}
