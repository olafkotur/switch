export interface ITokenData {
  accessToken: string
  refreshToken: string
}

export interface IApplicationData {
  _id: string
  userId: string
  url: string
  order: number
  icon?: string
}
