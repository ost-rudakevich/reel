import styles from './MoviesManage.module.scss'
import AdminHeader from '../ui/admin-header/AdminHeader'
import { useState } from 'react'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import AdminList from '../ui/admin-list/AdminList'
import AdminListItem from '../ui/admin-list/admin-list-item/AdminListItem'
import {
  useCreateMovieMutation,
  useGetAllMovieQuery
} from 'services/movie/movie.service'
import MoviesActions from './movies-actions/MoviesActions'
import { useNavigate } from 'react-router-dom'
import { hasErrorField } from 'utils/has-error-field'
import useCustomToast from 'hooks/useCustomToast'
import Button from 'ui/button/Button'

const MoviesManage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [createMovie] = useCreateMovieMutation()
  const navigate = useNavigate()
  const showToast = useCustomToast()

  const {
    data: moviesData,
    isError,
    isLoading
  } = useGetAllMovieQuery(searchTerm)

  if (isLoading) {
    return (
      <div className={styles['movies-manage']}>
        <Loading />
      </div>
    )
  }

  if (isError || !moviesData) {
    return (
      <div className={styles['movies-manage']}>
        <Error error='serverError' />
      </div>
    )
  }

  const createMovieHandler = async () => {
    try {
      const createdMovie = await createMovie().unwrap()
      navigate(`update-movie/${createdMovie.slug}`)
    } catch (e) {
      const error = hasErrorField(e) ? e.data.error : 'Server not found'
      showToast({
        title: 'Не вдалось створити фільм.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }

  return (
    <div className={styles['movies-manage']}>
      <AdminHeader setSearchTerm={setSearchTerm}>
        <Button variant='primary' onClick={createMovieHandler}>
          Створити +
        </Button>
      </AdminHeader>
      <AdminList headerItems={['Назва', 'Країна', 'Переглядів']}>
        {moviesData.map(movie => {
          return (
            <AdminListItem
              id={movie.id}
              name={movie.title}
              rowOne={movie.country}
              rowTwo={movie.views}
              key={movie.slug}
            >
              <MoviesActions
                id={movie.id}
                name={movie.title}
                slug={movie.slug}
              />
            </AdminListItem>
          )
        })}
      </AdminList>
    </div>
  )
}

export default MoviesManage
