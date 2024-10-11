import { FC } from 'react'
import styles from './Review.module.scss'
import { ILeaveReviewForm } from './review.interface'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IReviewDto } from 'services/review/review.service.interface'
import { Rating } from 'react-simple-star-rating'
import { useCreateReviewMutation } from 'services/review/review.service'
import useCustomToast from 'hooks/useCustomToast'
import { hasErrorField } from 'utils/has-error-field'
import Button from 'ui/button/Button'

const LeaveReviewForm: FC<ILeaveReviewForm> = ({ movieId, onCloseModal }) => {
  const showToast = useCustomToast()
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control
  } = useForm<IReviewDto>({
    mode: 'onChange'
  })

  const [createReview] = useCreateReviewMutation()

  const handlerCreateReview = async (reviewData: IReviewDto) => {
    try {
      if (isDirty) {
        await createReview({
          createData: reviewData,
          movieId: movieId
        }).unwrap()

        showToast({
          title: 'Успіх!',
          description: `Ви залишили відгук!`,
          status: 'success'
        })
        reset()
        onCloseModal()
      } else {
        showToast({
          title: 'Упс!',
          description: `Залиште ваш відгук.`,
          status: 'warning'
        })
      }
    } catch (e) {
      const error = hasErrorField(e) ? e.data.message : 'Server not found'
      showToast({
        title: 'Не вдалось залишити відгук.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }

  return (
    <div className={styles.leave_form}>
      <form onSubmit={handleSubmit(handlerCreateReview)}>
        <h1 className={styles.heading}>Поставте свою оцiнку</h1>

        <div>
          <Controller
            control={control}
            name='rating'
            render={({ field: { onChange, value } }) => (
              <Rating
                onClick={onChange}
                initialValue={value}
                SVGstyle={{
                  display: 'inline-block'
                }}
                size={20}
                transition
              />
            )}
            rules={{
              required: 'Рейтинг обовязковий!'
            }}
          />
          <textarea
            {...formRegister('text', {
              required: 'Текст обовязковий!'
            })}
            placeholder='Текст відгука...'
            className={styles.textarea}
          />

          {Object.entries(errors) && (
            <ul className={styles.errors}>
              {Object.entries(errors).map(([_, error]) => (
                <li key={error.message}>{error?.message}</li>
              ))}
            </ul>
          )}

          <div className='text-right mb-2 mt-8'>
            <Button variant='primary' type='submit'>
              Добавити
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LeaveReviewForm
