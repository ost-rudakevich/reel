import { FC } from 'react'
import styles from './StatisticsBlock.module.scss'
import { IMainStatistics } from 'types/statistics.types'
import { getIcon } from '../main-statistics/main-statisctics.util'
import CountUp from 'react-countup'

const StatisticsBlock: FC<IMainStatistics> = ({ name, value, id }) => {
  const Icon = getIcon(id)
  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>
        <Icon className={styles.icon} />
      </div>
      <h2>
        <CountUp end={value} />
      </h2>
    </div>
  )
}

export default StatisticsBlock
