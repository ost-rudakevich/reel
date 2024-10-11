import { FC } from 'react'
import styles from './GenresActions.module.scss'
import { hasErrorField } from 'utils/has-error-field'
import { IGenresActionsProps } from './genres-actions.interface'
import Button from 'ui/button/Button'
import { FaPencilAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaExternalLinkAlt } from 'react-icons/fa'
import { useDeleteGenreMutation } from 'services/genre/genre.service'
import useCustomToast from 'hooks/useCustomToast'

const GenresActions: FC<IGenresActionsProps> = ({ id, name, slug }) => {
  const [deleteGenre] = useDeleteGenreMutation()
  const showToast = useCustomToast()

  const deleteGenreHandler = async () => {
    try {
      await deleteGenre(id).unwrap()
      showToast({
        title: 'Увага!',
        description: `Ви удалили жанр ${name}`,
        status: 'info'
      })
    } catch (err) {
      const error = hasErrorField(err) ? err.data.error : 'Server not Found'
      showToast({
        title: 'Не вдалось видалити жанр.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }
  return (
    <div className={styles.wrapper}>
      <Link to={`/genre/${slug}`}>
        <Button variant='primary'>
          <FaExternalLinkAlt />
        </Button>
      </Link>
      <Link to={`update-genre/${slug}`}>
        <Button variant='primary'>
          <FaPencilAlt />
        </Button>
      </Link>
      <Button variant='primary' onClick={deleteGenreHandler}>
        <FaTrashAlt />
      </Button>
    </div>
  )
}
export default GenresActions
