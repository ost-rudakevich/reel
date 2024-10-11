import { IUser } from 'types/user.types'

export interface IUsersDto {
  email: string
  name?: string
  password?: string
  avatarPath?: string
  phone?: string
}

export interface IToggleFavoriteResponse {
  user: IUser
  message: string
}

export enum EnumUsersEndpoints {
  USERS = '/users'
}
