import { IUser } from './user.types'

export interface IAuthData {
  email: string
  password: string
  name?: string
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IAuthResponse extends ITokens {
  user: IUser
}
