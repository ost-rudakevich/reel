import { FC } from 'react'
import styles from './UserPanel.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { IoShield, IoShieldOutline } from 'react-icons/io5'
import Button from 'ui/button/Button'

const UserPanel: FC = () => {
  const user = useAuth()
  const { pathname } = useLocation()

  if (!user) {
    return (
      <div className={styles['user-panel']}>
        <Link to='login'>
          <Button variant='primary'>Вхід</Button>
        </Link>
        <Link to='register'>
          <Button variant='primary'>Реєстрація</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={styles['user-panel']}>
      {user.role === 'ADMIN' && (
        <Link to='admin'>
          {pathname.includes('/admin') ? (
            <IoShield className={styles.fill} />
          ) : (
            <IoShieldOutline />
          )}
        </Link>
      )}
      <Link to='/favourites'>
        {pathname === '/favourites' ? (
          <IoIosHeart className={styles.fill} />
        ) : (
          <IoIosHeartEmpty />
        )}
      </Link>
      <Link to='profile'>
        <img src={user.avatarPath} alt={user.name} />
      </Link>
    </div>
  )
}

export default UserPanel
