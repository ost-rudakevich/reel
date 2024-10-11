import { api } from 'services/api'
import { IReview } from 'types/review.types'
import { EnumReviewsEndpoints, IReviewDto } from './review.service.interface'

export const reviewApi = api.injectEndpoints({
  endpoints: build => ({
    createReview: build.mutation<
      IReview,
      { movieId: number; createData: IReviewDto }
    >({
      query: ({ movieId, createData }) => ({
        url: `${EnumReviewsEndpoints.REVIEWS}/create/${movieId}`,
        method: 'POST',
        body: createData
      }),
      invalidatesTags: (result, error, { movieId }) => [
        { type: 'Movie', id: movieId }
      ]
    }),

    deleteReview: build.mutation<IReview, { id: number }>({
      query: ({ id }) => ({
        url: `${EnumReviewsEndpoints.REVIEWS}/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Movie', id: result?.user.id }
      ]
    })
  })
})

export const { useCreateReviewMutation, useDeleteReviewMutation } = reviewApi
