import { FC } from 'react'
import styles from '../Sidebar.module.scss'
import { IMenuProps } from './menu.interface'
import { Link, useLocation } from 'react-router-dom'
import cn from 'clsx'
import { Icon } from 'ui/Icon'

const Menu: FC<IMenuProps> = ({ title, menu }) => {
  const { pathname } = useLocation()

  return (
    <div className={styles.menu}>
      <h1 className={styles.title}>{title}:</h1>
      <div className={styles.panel}>
        {menu.map(item => {
          return (
            <Link
              to={item.link}
              className={cn(styles.item, {
                [styles.active]: pathname === item.link
              })}
              key={item.name}
            >
              <Icon name={item.icon} className={styles.icon} />
              {item.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Menu
