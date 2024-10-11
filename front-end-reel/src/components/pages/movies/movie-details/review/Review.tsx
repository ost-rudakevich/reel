import { FC } from 'react'
import styles from './Review.module.scss'
import { IReviews } from './review.interface'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import Button from 'ui/button/Button'
import LeaveReviewForm from './LeaveReviewForm'
import ReviewItem from './ReviewItem'
import { useAuth } from 'hooks/useAuth'

const Review: FC<IReviews> = ({ movieId, reviews }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useAuth()
  return (
    <div className={styles.reviews}>
      {user && (
        <Button variant='primary' onClick={onOpen}>
          Натисiть,щоб залишити свiй вiдгук!
        </Button>
      )}
      <Modal
        blockScrollOnMount={true}
        closeOnEsc={true}
        isOpen={isOpen}
        isCentered={true}
        size='2xl'
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg='#232323'>
          <ModalHeader color='white' fontWeight='12px'>
            Залиште свiй вiдгук!
          </ModalHeader>
          <ModalCloseButton bg='#B61C1C' color='white' marginTop='10px' />
          <ModalBody>
            <LeaveReviewForm movieId={movieId} onCloseModal={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className={styles.wrapper}>
        {reviews.length ? (
          reviews.map(review => <ReviewItem key={review.id} review={review} />)
        ) : (
          <div>У цього фільму немає жодного відгука</div>
        )}
      </div>
    </div>
  )
}

export default Review
