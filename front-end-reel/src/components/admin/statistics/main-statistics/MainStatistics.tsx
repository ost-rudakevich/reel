import { FC } from 'react'
import styles from './MainStatistics.module.scss'
import { useGetMainStatisticsQuery } from 'services/statistics/statistics.service'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import StatisticsBlock from '../statistics-block/StatisticsBlock'
import FourPopularMovies from '../four-popular-movies/FourPopularMovies'

const MainStatistics: FC = () => {
  const {
    data: statisticsData,
    isError,
    isLoading
  } = useGetMainStatisticsQuery()

  if (isLoading) {
    return (
      <div className={styles['main-statistics']}>
        <Loading />
      </div>
    )
  }

  if (isError || !statisticsData) {
    return (
      <div className={styles['main-statistics']}>
        <Error error='serverError' />
      </div>
    )
  }
  return (
    <div className={styles['main-statistics']}>
      <h1 className={styles.header}>Статистика:</h1>
      <div className={styles.wrapper}>
        {statisticsData.map(block => {
          return (
            <StatisticsBlock
              id={block.id}
              name={block.name}
              value={block.value}
              key={block.name}
            />
          )
        })}
      </div>
      <FourPopularMovies />
    </div>
  )
}

export default MainStatistics
