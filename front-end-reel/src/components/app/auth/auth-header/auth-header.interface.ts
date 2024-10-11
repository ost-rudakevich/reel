import { UseFormReset } from 'react-hook-form'
import { IAuthProps } from '../auth-form/auth-form.interface'
import { IAuthData } from 'types/auth.types'

export interface IAuthHeaderProps extends IAuthProps {
  reset: UseFormReset<IAuthData>
}
