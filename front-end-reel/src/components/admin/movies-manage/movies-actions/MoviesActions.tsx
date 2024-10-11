import { FC } from 'react'
import styles from './MoviesActions.module.scss'
import { hasErrorField } from 'utils/has-error-field'
import { IMoviesActionsProps } from './movies-actions.interface'
import Button from 'ui/button/Button'
import { useDeleteMovieMutation } from 'services/movie/movie.service'
import { FaPencilAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaExternalLinkAlt } from 'react-icons/fa'
import useCustomToast from 'hooks/useCustomToast'

const MoviesActions: FC<IMoviesActionsProps> = ({ id, name, slug }) => {
  const [deleteMovie] = useDeleteMovieMutation()
  const showToast = useCustomToast()

  const deleteMovieHandler = async () => {
    try {
      await deleteMovie(id).unwrap()
      showToast({
        title: 'Увага!',
        description: `Ви удалили фільм ${name}`,
        status: 'info'
      })
    } catch (err) {
      const error = hasErrorField(err) ? err.data.error : 'Server not Found'
      showToast({
        title: 'Не вдалось видалити фiльм.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }
  return (
    <div className={styles.wrapper}>
      <Link to={`/movies/${slug}`}>
        <Button variant='primary'>
          <FaExternalLinkAlt />
        </Button>
      </Link>
      <Link to={`update-movie/${slug}`}>
        <Button variant='primary'>
          <FaPencilAlt />
        </Button>
      </Link>
      <Button variant='primary' onClick={deleteMovieHandler}>
        <FaTrashAlt />
      </Button>
    </div>
  )
}
export default MoviesActions
