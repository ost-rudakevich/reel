import styles from './GenresManage.module.scss'
import AdminHeader from '../ui/admin-header/AdminHeader'
import { useState } from 'react'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import AdminList from '../ui/admin-list/AdminList'
import AdminListItem from '../ui/admin-list/admin-list-item/AdminListItem'
import GenresActions from './genres-actions/GenresActions'
import {
  useCreateGenreMutation,
  useGetAllGenreQuery
} from 'services/genre/genre.service'
import { useNavigate } from 'react-router-dom'
import useCustomToast from 'hooks/useCustomToast'
import { hasErrorField } from 'utils/has-error-field'
import Button from 'ui/button/Button'

const GenresManage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [createGenre] = useCreateGenreMutation()
  const navigate = useNavigate()
  const showToast = useCustomToast()

  const {
    data: genresData,
    isError,
    isLoading
  } = useGetAllGenreQuery(searchTerm)

  if (isLoading) {
    return (
      <div className={styles['genres-manage']}>
        <Loading />
      </div>
    )
  }

  if (isError || !genresData) {
    return (
      <div className={styles['genres-manage']}>
        <Error error='serverError' />
      </div>
    )
  }

  const createGenreHandler = async () => {
    try {
      const createdGenre = await createGenre().unwrap()
      navigate(`update-genre/${createdGenre.slug}`)
    } catch (e) {
      const error = hasErrorField(e) ? e.data.error : 'Server not found'
      showToast({
        title: 'Не вдалось створити жанр.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }

  return (
    <div className={styles['genres-manage']}>
      <AdminHeader setSearchTerm={setSearchTerm}>
        <Button variant='primary' onClick={createGenreHandler}>
          Створити +
        </Button>
      </AdminHeader>
      <AdminList headerItems={['Назва', 'Іконка', 'Опис']}>
        {genresData.map(genre => {
          return (
            <AdminListItem
              id={genre.id}
              name={genre.name}
              rowOne={genre.icon}
              rowTwo={genre.description}
              key={genre.slug}
            >
              <GenresActions
                id={genre.id}
                name={genre.name}
                slug={genre.slug}
              />
            </AdminListItem>
          )
        })}
      </AdminList>
    </div>
  )
}

export default GenresManage
