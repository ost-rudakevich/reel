import { FC } from 'react'
import styles from './FavoriteButton.module.scss'
import {
  useGetUserProfileQuery,
  useToggleFavoriteMutation
} from 'services/user/user.service'
import { hasErrorField } from 'utils/has-error-field'
import useCustomToast from 'hooks/useCustomToast'
import { IFavoriteButtonProps } from '../details.interface'
import { AiFillHeart } from 'react-icons/ai'

const FavoriteButton: FC<IFavoriteButtonProps> = ({ movieId, name }) => {
  const { data: user } = useGetUserProfileQuery()
  const [toggleFavorite] = useToggleFavoriteMutation()
  const showToast = useCustomToast()

  if (!user) return null

  const isExists = user.favorites.find(favorite => favorite.id === movieId)

  const toggleFavoriteHandler = async () => {
    try {
      const { message } = await toggleFavorite(movieId).unwrap()
      message === 'add'
        ? showToast({
            title: 'Успіх!',
            description: `Ви добавили фільм ${name} в список улюблених!`,
            status: 'success'
          })
        : showToast({
            title: 'Увага!',
            description: `Ви удалили фільм ${name} з списку улюблених!`,
            status: 'info'
          })
    } catch (e) {
      const error = hasErrorField(e) ? e.data.error : 'Server not found'
      showToast({
        title: `Помилка: ${error}`,
        description: `Не вдалось добавити фільм ${name} в список улюблених!`,
        status: 'error'
      })
    }
  }

  return (
    <button className={styles.btn}>
      {isExists ? (
        <AiFillHeart
          onClick={toggleFavoriteHandler}
          size={33}
          className={styles.active}
        />
      ) : (
        <AiFillHeart
          onClick={toggleFavoriteHandler}
          size={33}
          className={styles.passive}
        />
      )}
    </button>
  )
}

export default FavoriteButton
