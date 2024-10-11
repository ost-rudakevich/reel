import { IReview } from 'types/review.types'

export interface IReviews {
  reviews: IReview[]
  movieId: number
}

export interface IReviewItemProps {
  review: IReview
}

export interface ILeaveReviewForm {
  movieId: number
  onCloseModal: () => void
}
