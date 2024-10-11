import { FC, useEffect } from 'react'
import styles from './MovieDetails.module.scss'
import {
  useGetMovieBySlugQuery,
  useUpdateCountViewsMutation
} from 'services/movie/movie.service'
import { useParams } from 'react-router-dom'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import Banner from 'ui/banner/Banner'
import Details from './details/Details'
import VideoPlayer from './video-player/VideoPlayer'
import Review from './review/Review'

const MovieDetails: FC = () => {
  const { movieSlug = '' } = useParams()
  const [updateViewCount] = useUpdateCountViewsMutation()
  const {
    data: movieData,
    isLoading,
    isError
  } = useGetMovieBySlugQuery(movieSlug, {
    refetchOnMountOrArgChange: true
  })

  useEffect(() => {
    updateViewCount(movieSlug)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (isError || !movieData) {
    return <Error error='serverError' />
  }

  return (
    <div className={styles['movie-details']}>
      <Banner
        image={movieData.bigPoster}
        Detail={() => <Details movie={movieData} />}
      />

      <VideoPlayer videoSource={movieData.videoUrl} />

      <Review movieId={movieData.id} reviews={movieData.reviews} />
    </div>
  )
}

export default MovieDetails
