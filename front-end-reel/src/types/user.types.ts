import { IMovie } from './movie.types'

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface IUser {
  id: number
  name: string
  email: string
  avatarPath: string
  role: UserRole
  createdAt: string
  favorites: IMovie[]
}

export interface IUserEditInput
  extends Pick<IUser, 'name' | 'email' | 'role'> {}
