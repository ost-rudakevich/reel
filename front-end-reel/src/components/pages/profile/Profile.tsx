import { FC } from 'react'
import styles from './Profile.module.scss'
import { useAuth } from 'hooks/useAuth'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserRole } from 'types/user.types'
import { Avatar } from '@chakra-ui/react'
import Button from 'ui/button/Button'
import { useAppDispatch } from 'hooks/state-hooks'
import { setUser } from 'state/userSlice/userSlice'

const Profile: FC = () => {
  const user = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(setUser(null))
    navigate('/login')
  }

  if (!user) {
    return <Navigate to='/login' />
  }

  return (
    <div className={styles.profile}>
      <div className={styles.title}>
        <div className={styles.user}>
          <Avatar
            name={user.name}
            src={user.avatarPath}
            size='xl'
            boxSize='200px'
          />

          <div className={styles.wrapper}>
            <h1 className={styles.name}>Привіт,{user.name}!</h1>
            <p className={styles.greet}>
              Вітаємо, ви є
              <span>
                {user.role === UserRole.ADMIN ? (
                  <Link to='/admin'> Адміністратором</Link>
                ) : (
                  ' Користувачем'
                )}{' '}
              </span>
              нашого сайту!
            </p>
          </div>
        </div>

        <div className={styles.logout}>
          <Button variant='primary' onClick={logout}>
            Вийти
          </Button>
        </div>
      </div>

      <Link to='/favourites' className='mt-12 px-12'>
        Ваш список &nbsp;
        <strong className='text-primary underline'>улюблених фільмів</strong>
      </Link>

      <div className={styles.info}>
        <p>
          Ласкаво просимо на наш сайт з фільмами! Тут ви знайдете величезну
          колекцію найкращих фільмів на будь-який смак. Насолоджуйтесь
          переглядом улюблених стрічок у високій якості, відкривайте нові жанри,
          діліться враженнями та створюйте власні списки для перегляду. Ми
          постійно оновлюємо нашу бібліотеку, щоб ви завжди могли знайти щось
          цікаве та захопливе. Приємного перегляду!
        </p>
      </div>
    </div>
  )
}

export default Profile
