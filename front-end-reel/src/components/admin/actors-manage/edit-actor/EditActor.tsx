import { FC } from 'react'
import styles from './EditActor.module.scss'
import formStyles from 'ui/AdminForm.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from 'ui/button/Button'
import Field from 'ui/input/field/Field'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import { hasErrorField } from 'utils/has-error-field'
import {
  useGetActorBySlugQuery,
  useUpdateActorMutation
} from 'services/actor/actor.service'
import { IActorEdit } from 'types/actor.types'
import moment from 'moment'
import { formatDate } from 'utils/form-data'
import FileField from 'ui/input/file-field/FileField'
import useCustomToast from 'hooks/useCustomToast'

const EditActor: FC = () => {
  const { actorSlug = '' } = useParams()
  const { data: actor, isLoading, isError } = useGetActorBySlugQuery(actorSlug)
  const [updateActor] = useUpdateActorMutation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const showToast = useCustomToast()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty }
  } = useForm<IActorEdit>({
    mode: 'onChange',
    values: {
      name: actor?.name || '',
      photoUrl: actor?.photoUrl || '/default/actor-default.jpg',
      dateOfBirth: formatDate(actor?.dateOfBirth),
      birthplace: actor?.birthplace || ''
    }
  })

  if (isLoading) {
    return (
      <div className={styles.edit}>
        <Loading />
      </div>
    )
  }

  if (isError || !actor) {
    return (
      <div className={styles.edit}>
        <Error error='serverError' />
      </div>
    )
  }

  const handleUpdateActor = async (actorData: IActorEdit) => {
    try {
      if (isDirty) {
        const updatedActorData = await updateActor({
          id: actor.id,
          updateData: {
            ...actorData,
            dateOfBirth: moment(actorData.dateOfBirth).format()
          }
        }).unwrap()
        navigate(pathname.replace(actorSlug, updatedActorData.slug))
        showToast({
          title: 'Успіх!',
          description: `Ви успішно оновили актора!`,
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
        title: 'Не вдалось оновити актора.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }

  return (
    <div className={styles.edit}>
      <h1 className={styles.title}>Обновлення актора</h1>
      <form
        onSubmit={handleSubmit(handleUpdateActor)}
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
            required
            placeholder='Введіть імя актора'
            error={errors.name?.message}
            style={{ height: '80px' }}
          />

          <Field
            {...register('birthplace', {
              required: 'Це обовязкове поле',
              minLength: {
                value: 1,
                message: 'Введіть більше 1 символа'
              }
            })}
            required
            placeholder='Введіть назву країни'
            error={errors.birthplace?.message}
            style={{ height: '80px' }}
          />

          <Field
            {...register('dateOfBirth', { required: 'Це обовязкове поле' })}
            required
            placeholder='Введіть дату'
            error={errors.dateOfBirth?.message}
            style={{ height: '80px' }}
            type='date'
          />

          <div className={formStyles.wrapper}>
            <Controller
              name='photoUrl'
              control={control}
              defaultValue=''
              render={({
                field: { value, onChange },
                fieldState: { error }
              }) => (
                <FileField
                  onChange={onChange}
                  value={value}
                  error={error}
                  folder='actors'
                  placeholder='Загрузіть фото актора в форматі .WEBP'
                  style={{ width: '20%' }}
                />
              )}
              rules={{
                required: 'Загрузіть фото актора'
              }}
            />
          </div>
        </div>

        <Button variant='primary'>Застосувати зміни</Button>
      </form>
    </div>
  )
}

export default EditActor
