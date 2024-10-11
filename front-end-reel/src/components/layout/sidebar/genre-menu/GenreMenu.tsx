import { FC } from 'react'
import styles from '../Sidebar.module.scss'
import { IGenreMenuProps } from './genre-menu.interface'
import { Link, useParams } from 'react-router-dom'
import cn from 'clsx'
import { Icon } from 'ui/Icon'

const GenreMenu: FC<IGenreMenuProps> = ({ genreMenu }) => {
  const { genreSlug } = useParams()
  return (
    <div className={styles.menu}>
      <h1 className={styles.title}>Жанри:</h1>
      <div className={styles.panel}>
        {genreMenu.map(item => {
          return (
            <Link
              to={`genre/${item.slug}`}
              state={{ name: item.name }}
              className={cn(styles.item, {
                [styles.active]: genreSlug === item.slug
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

export default GenreMenu
