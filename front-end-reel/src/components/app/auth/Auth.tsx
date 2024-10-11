import { FC } from 'react'
import styles from './Auth.module.scss'
import AuthForm from './auth-form/AuthForm'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthEnum } from './auth.interface'
import { useAuth } from 'hooks/useAuth'

const Auth: FC = () => {
  const { pathname } = useLocation()
  const auth = useAuth()

  if (auth) {
    return <Navigate to='/' />
  }

  return (
    <section className={styles['auth-container']}>
      <AuthForm type={pathname as AuthEnum.LOGIN | AuthEnum.REGISTER} />
      <img
        src='/images/auth-logo.webp'
        alt=''
        className={styles['auth-logo']}
      />
    </section>
  )
}

export default Auth
