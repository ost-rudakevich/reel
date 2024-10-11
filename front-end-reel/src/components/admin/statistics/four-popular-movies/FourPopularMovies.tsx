import { FC } from 'react'
import styles from './FourPopularMovies.module.scss'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useGetFourPopularMoviesQuery } from 'services/statistics/statistics.service'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import TopMoviesTooltip from '../TopMoviesTooltip'
import { Link } from 'react-router-dom'

const FourPopularMovies: FC = () => {
  const {
    data: fivePopularMoviesData,
    isError,
    isLoading
  } = useGetFourPopularMoviesQuery()

  if (isLoading) {
    return (
      <div className={styles['top-movies']}>
        <Loading />
      </div>
    )
  }

  if (isError || !fivePopularMoviesData) {
    return (
      <div className={styles['top-movies']}>
        <Error error='serverError' />
      </div>
    )
  }

  const COLORS = ['#B61C1C', '#822A2A', '#790A0A', '#5D0B0B', '#4f0202']
  return (
    <div className={styles['top-movies']}>
      <h1 className={styles.title}>Топ 5 фільмів</h1>
      <ResponsiveContainer width='100%' height={210}>
        <PieChart>
          <Pie
            data={fivePopularMoviesData}
            cx='50%'
            cy='50%'
            innerRadius='60%'
            outerRadius='80%'
            paddingAngle={4}
            dataKey='views'
            labelLine={false}
            stroke='none'
          >
            {fivePopularMoviesData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{ outline: 'none' }}
              />
            ))}
          </Pie>
          <Tooltip content={<TopMoviesTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className={styles.list}>
        {fivePopularMoviesData.map((movie, index) => {
          return (
            <Link key={movie.slug} to={`/movies/${movie.slug}`}>
              <h1>{`${index + 1}. ${movie.title}`}</h1>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default FourPopularMovies
