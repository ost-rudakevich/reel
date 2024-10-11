import styles from './ActorsManage.module.scss'
import AdminHeader from '../ui/admin-header/AdminHeader'
import { useState } from 'react'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import AdminList from '../ui/admin-list/AdminList'
import AdminListItem from '../ui/admin-list/admin-list-item/AdminListItem'
import {
  useCreateActorMutation,
  useGetAllActorsQuery
} from 'services/actor/actor.service'
import ActorsActions from './actors-actions/ActorsActions'
import { formatDate } from 'utils/form-data'
import { useNavigate } from 'react-router-dom'
import useCustomToast from 'hooks/useCustomToast'
import { hasErrorField } from 'utils/has-error-field'
import Button from 'ui/button/Button'

const ActorsManage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [createActor] = useCreateActorMutation()
  const navigate = useNavigate()
  const showToast = useCustomToast()

  const {
    data: actorsData,
    isError,
    isLoading
  } = useGetAllActorsQuery(searchTerm)

  if (isLoading) {
    return (
      <div className={styles['actors-manage']}>
        <Loading />
      </div>
    )
  }

  if (isError || !actorsData) {
    return (
      <div className={styles['actors-manage']}>
        <Error error='serverError' />
      </div>
    )
  }

  const createActorHandler = async () => {
    try {
      const createdActor = await createActor().unwrap()
      navigate(`update-actor/${createdActor.slug}`)
    } catch (e) {
      const error = hasErrorField(e) ? e.data.error : 'Server not found'
      showToast({
        title: 'Не вдалось створити актора.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }

  return (
    <div className={styles['actors-manage']}>
      <AdminHeader setSearchTerm={setSearchTerm}>
        <Button variant='primary' onClick={createActorHandler}>
          Створити +
        </Button>
      </AdminHeader>
      <AdminList headerItems={['Імя', 'Місце народження', 'Рік народження']}>
        {actorsData.map(genre => {
          return (
            <AdminListItem
              id={genre.id}
              name={genre.name}
              rowOne={genre.birthplace}
              rowTwo={formatDate(genre.dateOfBirth)}
              key={genre.slug}
            >
              <ActorsActions
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

export default ActorsManage
