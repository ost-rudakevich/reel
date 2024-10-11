import { FC } from 'react'
import styles from './EditGenre.module.scss'
import formStyles from 'ui/AdminForm.module.scss'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  useGetGenreBySlugQuery,
  useUpdateGenreMutation
} from 'services/genre/genre.service'
import { IGenreEdit } from 'types/genre.types'
import Button from 'ui/button/Button'
import Field from 'ui/input/field/Field'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import { hasErrorField } from 'utils/has-error-field'
import useCustomToast from 'hooks/useCustomToast'

const EditGenre: FC = () => {
  const { genreSlug = '' } = useParams()
  const { data: genre, isLoading, isError } = useGetGenreBySlugQuery(genreSlug)
  const [updateGenre] = useUpdateGenreMutation()
  const showToast = useCustomToast()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty }
  } = useForm<IGenreEdit>({
    mode: 'onChange',
    values: {
      name: genre?.name || '',
      description: genre?.description || '',
      icon: genre?.icon! || ''
    }
  })

  if (isLoading) {
    return (
      <div className={styles.edit}>
        <Loading />
      </div>
    )
  }

  if (isError || !genre) {
    return (
      <div className={styles.edit}>
        <Error error='serverError' />
      </div>
    )
  }

  const handleUpdateGenre = async (genreData: IGenreEdit) => {
    try {
      if (isDirty) {
        const updatedGenreData = await updateGenre({
          id: genre.id,
          updateData: genreData
        }).unwrap()
        navigate(pathname.replace(genreSlug, updatedGenreData.slug))
        showToast({
          title: 'Успіх!',
          description: `Ви успішно оновили жанр!`,
          status: 'success'
        })
      } else {
        showToast({
          title: 'Упс!',
          description: `Оновіть дані, інакше ви не зможете застосувати зміни.`,
          status: 'warning'
        })
      }
    } catch (e) {
      const error = hasErrorField(e) ? e.data.message : 'Server not found'
      showToast({
        title: 'Не вдалось оновити жанр.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }

  return (
    <div className={styles.edit}>
      <h1 className={styles.title}>Обновлення жанру</h1>
      <form
        onSubmit={handleSubmit(handleUpdateGenre)}
        className={formStyles.form}
      >
        <div className={formStyles.fields}>
          <Field
            {...register('name', {
              required: 'Це обовязкове поле',
              minLength: {
                value: 1,
                message: 'Введіть більше 1 символа'
              }
            })}
            placeholder='Введіть назву жанра'
            error={errors.name?.message}
            style={{ height: '80px' }}
          />

          <div className={styles.wrapper} style={{ marginBottom: '23px' }}>
            <Link to='/admin/icon-gallery'>
              <span>Іконку можна вибрати тут</span>
            </Link>
            <Field
              {...register('icon', {
                required: 'Це обовязкове поле',
                minLength: {
                  value: 1,
                  message: 'Введіть більше 1 символа'
                }
              })}
              placeholder='Введіть назву іконки'
              error={errors.icon?.message}
              style={{ height: '80px' }}
            />
          </div>

          <Field
            {...register('description')}
            placeholder='Введіть опис'
            error={errors.description?.message}
            style={{ height: '80px' }}
          />
        </div>

        <Button variant='primary'>Застосувати зміни</Button>
      </form>
    </div>
  )
}

export default EditGenre
