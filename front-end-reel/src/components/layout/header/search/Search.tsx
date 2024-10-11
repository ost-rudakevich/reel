import { FC, useState } from 'react'
import styles from './Search.module.scss'
import { IoIosSearch } from 'react-icons/io'
import SearchList from './search-list/SearchList'
import { useLazyGetAllMovieQuery } from 'services/movie/movie.service'
import Field from 'ui/input/field/Field'

const Search: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showResults, setShowResults] = useState<boolean>(false)

  const [getMovieList, { data, isError, isLoading }] = useLazyGetAllMovieQuery()

  const handleSearch = () => {
    if (!searchTerm) {
      return
    }
    getMovieList(searchTerm)
    setShowResults(true)
  }

  return (
    <div className={styles['search-wrapper']}>
      <Field
        placeholder='Я шукаю...'
        Icon={IoIosSearch}
        iconSide='right'
        onChange={e => setSearchTerm(e.target.value)}
        handleSearch={handleSearch}
      />

      {showResults && (
        <SearchList
          data={data || []}
          isError={isError}
          isLoading={isLoading}
          showResults={showResults}
          setShowResults={setShowResults}
        />
      )}
    </div>
  )
}

export default Search
