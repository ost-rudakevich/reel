import { useAuth } from 'hooks/useAuth'
import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const user = useAuth()

  if (!user) {
    return <Navigate to='/login' />
  }

  return children
}

export default RequireAuth
