import { FC } from 'react'
import styles from './Gallery.module.scss'
import { IGalleryItemProps } from './gallery.interface'
import { Link } from 'react-router-dom'
import cn from 'clsx'

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
  return (
    <Link
      to={item.link}
      className={cn(styles.item, {
        [styles.with_text]: item.content,
        [styles.horizontal]: variant === 'horizontal',
        [styles.vertical]: variant === 'vertical'
      })}
    >
      <img src={item.poster} alt={item.name} loading='lazy' />

      <div
        className={cn(styles.content, {
          [styles.bottom]: item.content.subTitle
        })}
      >
        <h1 className={styles.title}>{item.content.title}</h1>
        {item.content.subTitle && (
          <div className={styles.sub_title}>{item.content.subTitle}</div>
        )}
      </div>
    </Link>
  )
}

export default GalleryItem
