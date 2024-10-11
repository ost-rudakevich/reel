import { FC } from 'react'
import styles from './ActorsActions.module.scss'
import { hasErrorField } from 'utils/has-error-field'
import { IActorsActionsProps } from './actors-actions.interface'
import Button from 'ui/button/Button'
import { FaTrashAlt, FaExternalLinkAlt, FaPencilAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDeleteActorMutation } from 'services/actor/actor.service'
import useCustomToast from 'hooks/useCustomToast'

const ActorsActions: FC<IActorsActionsProps> = ({ id, name, slug }) => {
  const [deleteActor] = useDeleteActorMutation()
  const showToast = useCustomToast()

  const deleteActorHandler = async () => {
    try {
      await deleteActor(id).unwrap()
      showToast({
        title: 'Увага!',
        description: `Ви удалили актора ${name}`,
        status: 'info'
      })
    } catch (err) {
      const error = hasErrorField(err) ? err.data.error : 'Server not Found'
      showToast({
        title: 'Не вдалось видалити актора.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }
  return (
    <div className={styles.wrapper}>
      <Link to={`/actor/${slug}`}>
        <Button variant='primary'>
          <FaExternalLinkAlt />
        </Button>
      </Link>
      <Link to={`update-actor/${slug}`}>
        <Button variant='primary'>
          <FaPencilAlt />
        </Button>
      </Link>
      <Button variant='primary' onClick={deleteActorHandler}>
        <FaTrashAlt />
      </Button>
    </div>
  )
}
export default ActorsActions
