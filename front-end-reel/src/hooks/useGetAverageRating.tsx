import { IReview } from 'types/review.types'

const useGetAverageRating = (reviewList: IReview[]) => {
  if (reviewList.length === 0) {
    return 0.0
  }

  const rating = (
    reviewList.reduce((acc, review) => acc + review.rating, 0) /
    reviewList.length
  ).toFixed(1)

  return parseFloat(rating)
}

export default useGetAverageRating
