import { FC } from 'react'
import styles from './Header.module.scss'
import Logo from './logo/Logo'
import UserPanel from './user-panel/UserPanel'
import Search from './search/Search'

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <Logo />
      <Search />
      <UserPanel />
    </div>
  )
}

export default Header
