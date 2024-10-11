import { FC, useEffect } from 'react'
import styles from './Layout.module.scss'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import { useAuth } from 'hooks/useAuth'
import { useAppDispatch } from 'hooks/state-hooks'
import { setUser } from 'state/userSlice/userSlice'
import cn from 'clsx'

const Layout: FC = () => {
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const isAuth = useAuth()
  const { movieSlug } = useParams()

  // useEffect(() => {
  //   if (isAuth === null) {
  //     dispatch(setUser(null))
  //     nav('/login')
  //   }
  // }, [isAuth])
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.outlet}>
        <Sidebar />
        <div
          className={cn(styles['outlet-wrapper'], {
            [styles['no-padding']]: movieSlug
          })}
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout

{
  /* <div className={styles.outlet}>
        <Sidebar />
        <div className={styles['outlet-wrapper']}>
          <Outlet />
        </div>
      </div> */
}
