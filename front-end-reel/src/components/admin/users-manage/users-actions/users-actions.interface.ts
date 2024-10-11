import { UserRole } from 'types/user.types'

export interface IUsersActionsProps {
  id: number
  name: string
  role: UserRole.ADMIN | UserRole.USER
}
