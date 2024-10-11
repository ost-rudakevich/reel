import { FC } from 'react'
import styles from './IconGallery.module.scss'
import * as IconsLu from 'react-icons/lu'
import { Icon } from 'ui/Icon'

const IconGallery: FC = () => {
  type TypeIconName = keyof typeof IconsLu
  return (
    <div className={styles['icon-gallery']}>
      <h1 className={styles.title}>Галерея іконок</h1>
      <div className={styles.gallery}>
        {Object.entries(IconsLu).map(([name, IconComponent]) => (
          <div className={styles.icon} key={name}>
            <Icon name={name as TypeIconName} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IconGallery
