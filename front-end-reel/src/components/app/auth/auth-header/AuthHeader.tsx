import { FC } from 'react'
import styles from './AuthHeader.module.scss'
import { Link } from 'react-router-dom'
import { AuthEnum } from '../auth.interface'
import { IAuthHeaderProps } from './auth-header.interface'

const AuthHeader: FC<IAuthHeaderProps> = ({ type, reset }) => {
  return (
    <header className={styles['auth-header']}>
      <div className={styles.title}>
        <h1>Reel</h1>
        <img src='/logo.svg' alt='LOGO' />
      </div>

      <div className={styles.switcher}>
        {type === AuthEnum.LOGIN ? (
          <Link to={AuthEnum.REGISTER} onClick={() => reset()}>
            Створити обліковий запис
          </Link>
        ) : (
          <Link to={AuthEnum.LOGIN} onClick={() => reset()}>
            Уже маєте обліковий запис?
          </Link>
        )}
      </div>
    </header>
  )
}

export default AuthHeader
