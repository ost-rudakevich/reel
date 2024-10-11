import { FC } from 'react'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'

const Logo: FC = () => {
  return (
    <Link to='/' className={styles.logo}>
      <img src='/logo.svg' alt='REEL' width={70} height={70} />
      <div className={styles.name}>ReeL</div>
    </Link>
  )
}

export default Logo
