import { FC } from 'react'
import styles from './SearchList.module.scss'
import { ISearchListProps } from './search-list.interface'
import Loading from 'ui/loading/Loading'
import { Link } from 'react-router-dom'
import { CloseButton } from '@chakra-ui/react'

const SearchList: FC<ISearchListProps> = ({
  data,
  isError,
  isLoading,
  showResults,
  setShowResults
}) => {
  const closeResultList = () => {
    setShowResults(false)
  }

  if (isLoading) {
    return (
      <div className={`${styles['search-list']} ${styles.loading}`}>
        <Loading size='sm' />
      </div>
    )
  }

  if (isError || data.length === 0) {
    return (
      <div className={styles['search-list']}>
        <div className={`${styles.title} ${styles.error}`}>
          <CloseButton size='lg' colorScheme='gray' onClick={closeResultList} />
        </div>
        <div className={styles['not-found']}>Нiчого не знайдено</div>
      </div>
    )
  }

  if (showResults === true) {
    return (
      <div className={styles['search-list']}>
        <div className={styles.title}>
          <span>Результат пошуку: </span>
          <CloseButton size='lg' colorScheme='gray' onClick={closeResultList} />
        </div>
        <div className={styles['search-result']}>
          {data.map(movie => {
            return (
              <Link
                to={`movies/${movie.slug}`}
                key={movie.id}
                className={styles.item}
                onClick={closeResultList}
              >
                <img src={movie.poster} alt={movie.slug} />
                <div className={styles.info}>
                  <span className={styles.name}>{movie.title}</span>
                  <div className={styles.genres}>
                    {movie.genres.map(genre => {
                      return <span key={genre.slug}>{genre.name}</span>
                    })}
                  </div>
                  <span className={styles.year}>{movie.year}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SearchList
