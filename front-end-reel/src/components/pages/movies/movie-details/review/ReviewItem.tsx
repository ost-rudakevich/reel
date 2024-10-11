import { FC } from 'react'
import styles from './Review.module.scss'
import { IReviewItemProps } from './review.interface'
import { Rating } from 'react-simple-star-rating'
import Button from 'ui/button/Button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { useDeleteReviewMutation } from 'services/review/review.service'
import useCustomToast from 'hooks/useCustomToast'
import { hasErrorField } from 'utils/has-error-field'
import React from 'react'
import { useAuth } from 'hooks/useAuth'

const ReviewItem: FC<IReviewItemProps> = ({ review }) => {
  const [deleteReview] = useDeleteReviewMutation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const showToast = useCustomToast()
  const user = useAuth()

  const handlerDeleteReview = async (id: number) => {
    try {
      await deleteReview({ id: id }).unwrap()
      onClose()
    } catch (e) {
      const error = hasErrorField(e) ? e.data.message : 'Server not found'
      showToast({
        title: 'Не вдалось видалити відгук.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
      onClose()
    }
  }

  return (
    <div className={styles.review}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img
            alt={review.user.name}
            src={review.user.avatarPath}
            width={40}
            height={40}
            className={styles.avatar}
          />
          <span>{review.user.name}</span>
        </div>
        {review.user.id === user?.id && (
          <Button
            variant='primary'
            style={{
              padding: '1px 5px',
              fontSize: '10px',
              height: '50%'
            }}
            onClick={onOpen}
          >
            Удалити
          </Button>
        )}
      </div>
      <Rating
        readonly
        initialValue={review.rating}
        SVGstyle={{
          display: 'inline-block'
        }}
        size={18}
        allowFraction
        transition
      />
      <div className={styles.text}>{review.text}</div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered={true}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg='#232323' textColor='white'>
            <AlertDialogHeader fontSize='lg' fontWeight='12px'>
              Ви справді хочете видалити свій відгук?
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant='primary' ref={cancelRef} onClick={onClose}>
                Нi
              </Button>
              <Button
                variant='primary'
                onClick={() => handlerDeleteReview(review.id)}
                style={{ marginLeft: '10px' }}
              >
                Удалити
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}

export default ReviewItem
