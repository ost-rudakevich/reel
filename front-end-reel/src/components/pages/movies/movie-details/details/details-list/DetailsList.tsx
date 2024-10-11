import { FC } from 'react'
import styles from './DetailsList.module.scss'
import { IDetailsListProps } from '../details.interface'
import { Link } from 'react-router-dom'

const DetailsList: FC<IDetailsListProps> = ({ name, links }) => {
  return (
    <div className={styles.list}>
      <span className={styles.name}>{name}</span>
      <div className={styles.links}>
        {links.slice(0, 3).map((link, index) => {
          return (
            <Link
              to={link.link}
              state={{ name: link.title }}
              className={styles.link}
              key={link.title}
            >
              {link.title}
              {index + 1 !== links.length ? ',  ' : ''}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default DetailsList
