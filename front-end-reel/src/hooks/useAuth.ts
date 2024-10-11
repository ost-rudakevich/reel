import { getAccessToken } from 'services/auth/auth.helper'
import { useAppSelector } from './state-hooks'

export const useAuth = () => {
  const { refreshToken, accessToken } = getAccessToken()
  const user = useAppSelector(state => state.userSlice.user)

  if (refreshToken && accessToken && user) {
    return user
  }

  return null
}
