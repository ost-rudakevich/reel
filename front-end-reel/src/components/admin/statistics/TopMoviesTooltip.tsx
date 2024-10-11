import { FC } from 'react'
import styles from './TopMoviesTooltip.module.scss'

interface ITopMoviesTooltip {
  active?: boolean
  payload?: any
}

const TopMoviesTooltip: FC<ITopMoviesTooltip> = ({ active, payload }) => {
  if (!active) return null

  const title = payload[0].payload.title
  const value = payload[0].value

  return (
    <div className={styles.tooltip}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>
        Перегляди:
        <span>{value}</span>
      </p>
    </div>
  )
}

export default TopMoviesTooltip
