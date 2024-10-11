import { IUser } from './user.types'

export interface IReview {
  id: number
  createdAt: string
  user: IUser
  text: string
  rating: number
}
