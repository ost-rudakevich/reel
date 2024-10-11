import { useAuth } from 'hooks/useAuth'
import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const RequireAdmin: FC<PropsWithChildren> = ({ children }) => {
  const user = useAuth()

  if (!user || user.role === 'USER') {
    return <Navigate to='/' />
  }

  return children
}

export default RequireAdmin
