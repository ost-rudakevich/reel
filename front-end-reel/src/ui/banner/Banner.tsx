import { FC } from 'react'
import styles from './Banner.module.scss'
import { IBannerProps } from './banner.interface'

const Banner: FC<IBannerProps> = ({ image, Detail }) => {
  return (
    <div className={styles.banner}>
      <img src={image} alt='' />
      {Detail && <Detail />}
    </div>
  )
}

export default Banner
