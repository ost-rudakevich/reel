import { FC } from 'react'
import styles from './EditMovie.module.scss'
import formStyles from 'ui/AdminForm.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from 'ui/button/Button'
import Field from 'ui/input/field/Field'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import { hasErrorField } from 'utils/has-error-field'
import {
  useGetMovieBySlugQuery,
  useUpdateMovieMutation
} from 'services/movie/movie.service'
import FileField from 'ui/input/file-field/FileField'
import useCustomToast from 'hooks/useCustomToast'
import { IMovieEdit } from 'types/movie.types'
import SelectComponent from 'ui/select-component/Select'
import { useGetAllActorsQuery } from 'services/actor/actor.service'
import { useGetAllGenreQuery } from 'services/genre/genre.service'

const EditMovie: FC = () => {
  const { movieSlug = '' } = useParams()
  const { data: movie, isLoading, isError } = useGetMovieBySlugQuery(movieSlug)
  const { data: actors = [], isLoading: isLoadingActors } =
    useGetAllActorsQuery('')
  const { data: genres = [], isLoading: isLoadingGenres } =
    useGetAllGenreQuery('')
  const [updateMovie] = useUpdateMovieMutation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const showToast = useCustomToast()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty }
  } = useForm<IMovieEdit>({
    mode: 'onChange',
    values: {
      title: movie?.title || '',
      slug: movie?.slug || '',
      country: movie?.country || '',
      duration: movie?.duration || 0,
      year: movie?.year || 0,
      poster: movie?.poster || '/default/movie-default.jpg',
      bigPoster: movie?.bigPoster || '/default/movie-default.jpg',
      videoUrl: movie?.videoUrl || '',
      genres: movie?.genres.map(genre => genre.id) || [],
      actors: movie?.actors.map(actor => actor.id) || []
    }
  })

  if (isLoading) {
    return (
      <div className={styles.edit}>
        <Loading />
      </div>
    )
  }

  if (isError || !movie) {
    return (
      <div className={styles.edit}>
        <Error error='serverError' />
      </div>
    )
  }

  const handleUpdateMovie = async (movieData: IMovieEdit) => {
    try {
      if (isDirty) {
        const updatedMovieData = await updateMovie({
          id: movie.id,
          updateData: {
            ...movieData,
            year: +movieData.year,
            duration: +movieData.duration
          }
        }).unwrap()
        navigate(pathname.replace(movieSlug, updatedMovieData.slug))
        showToast({
          title: 'Успіх!',
          description: `Ви успішно оновили фільм!`,
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
        title: 'Не вдалось оновити фільм.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }

  return (
    <div className={styles.edit}>
      <h1 className={styles.title}>Обновлення фільма</h1>
      <form
        onSubmit={handleSubmit(handleUpdateMovie)}
        className={formStyles.form}
      >
        <div className={formStyles.fields}>
          <Field
            {...register('title', {
              required: 'Це обовязкове поле',
              minLength: {
                value: 1,
                message: 'Введіть більше 1 символа'
              }
            })}
            placeholder='Введіть назву фільма'
            error={errors.title?.message}
            style={{ height: '80px' }}
          />

          <Field
            {...register('country', {
              required: 'Це обовязкове поле',
              minLength: {
                value: 1,
                message: 'Введіть більше 1 символа'
              }
            })}
            placeholder='Введіть назву країни'
            error={errors.country?.message}
            style={{ height: '80px' }}
          />

          <Field
            {...register('duration', {
              required: 'Це обовязкове поле',
              minLength: {
                value: 2,
                message: 'Введіть більше 1 символа'
              }
            })}
            placeholder='Введіть тривалість фільма (в хвилинах)'
            error={errors.duration?.message}
            type='number'
            style={{ height: '80px' }}
          />

          <Field
            {...register('year', {
              required: 'Це обовязкове поле',
              minLength: {
                value: 4,
                message: 'Введіть більше 4 символів'
              }
            })}
            placeholder='Введіть рік створення'
            error={errors.year?.message}
            type='number'
            style={{ height: '80px' }}
          />

          <Controller
            name='actors'
            control={control}
            rules={{
              required: 'Введіть акторів,які знімались у цьому фільмі'
            }}
            render={({ field, fieldState: { error } }) => (
              <SelectComponent
                error={error?.message}
                field={field}
                placeholder='Список акторів'
                options={actors.map(actor => {
                  return { label: actor.name, value: actor.id }
                })}
                isLoading={isLoadingActors}
                isMulti
              />
            )}
          />

          <Controller
            name='genres'
            control={control}
            rules={{
              required: 'Введіть жанри,до яких відноситься цей фільм'
            }}
            render={({ field, fieldState: { error } }) => (
              <SelectComponent
                error={error?.message}
                field={field}
                placeholder='Список жанрів'
                options={genres.map(genre => {
                  return { label: genre.name, value: genre.id }
                })}
                isLoading={isLoadingGenres}
                isMulti
              />
            )}
          />

          <div className={formStyles.wrapper}>
            <Controller
              name='poster'
              control={control}
              defaultValue=''
              rules={{
                required: 'Загрузіть вертикальний постер'
              }}
              render={({
                field: { value, onChange },
                fieldState: { error }
              }) => (
                <FileField
                  onChange={onChange}
                  value={value}
                  error={error}
                  folder='movies'
                  placeholder='Загрузіть вертикальний постер в форматі .WEBP'
                  style={{ width: '23%' }}
                />
              )}
            />
            <Controller
              name='bigPoster'
              control={control}
              defaultValue=''
              rules={{
                required: 'Загрузіть горизонтальний постер'
              }}
              render={({
                field: { value, onChange },
                fieldState: { error }
              }) => (
                <FileField
                  onChange={onChange}
                  value={value}
                  error={error}
                  folder='movies'
                  placeholder='Загрузіть горизонтальний постер в форматі .WEBP'
                  style={{ width: '55%' }}
                />
              )}
            />
            <Controller
              name='videoUrl'
              control={control}
              defaultValue=''
              rules={{
                required: 'Загрузіть фільм або трейлер фільма в форматі .mp4'
              }}
              render={({
                field: { value, onChange },
                fieldState: { error }
              }) => (
                <FileField
                  onChange={onChange}
                  value={value}
                  error={error}
                  folder='movies'
                  isNoImage
                  placeholder='Загрузіть фільм або трейлер фільма в форматі .mp4'
                  style={{ width: '100%' }}
                />
              )}
            />
          </div>
        </div>

        <Button variant='primary'>Застосувати зміни</Button>
      </form>
    </div>
  )
}

export default EditMovie
