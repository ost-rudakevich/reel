import { FC } from 'react'
import styles from './Gallery.module.scss'
import { IGallery } from './gallery.interface'
import GalleryItem from './GalleryItem'

const Gallery: FC<IGallery> = ({ items, title, variant = 'vertical' }) => {
  return (
    <div className={styles['gallery-wrapper']}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.gallery}>
        {items.length ? (
          items.map(item => (
            <GalleryItem key={item.link} item={item} variant={variant} />
          ))
        ) : (
          <div style={{ color: '#808080' }}>Поки що пусто :(</div>
        )}
      </div>
    </div>
  )
}

export default Gallery
