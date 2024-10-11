import { FC } from 'react'
import {
  useGetFourPopularMoviesQuery,
  useGetPopularActorsQuery
} from 'services/statistics/statistics.service'
import Error from 'ui/error/Error'
import Gallery from 'ui/gallery/Gallery'
import Loading from 'ui/loading/Loading'

const Home: FC = () => {
  const {
    data: movieData,
    isLoading: movieIsLoading,
    isError: movieIsError
  } = useGetFourPopularMoviesQuery()

  const {
    data: actorData,
    isLoading: actorIsLoading,
    isError: actorIsError
  } = useGetPopularActorsQuery()

  if (movieIsError || !movieData || actorIsError || !actorData) {
    return <Error error='serverError' />
  }

  if (actorIsLoading || movieIsLoading) {
    return <Loading />
  }

  return (
    <>
      <Gallery
        title='Топ 5 фільмів'
        items={movieData.map(movie => {
          return {
            name: movie.title,
            poster: movie.poster,
            link: `/movies/${movie.slug}`,
            content: {
              title: movie.title,
              subTitle: movie.genre.name
            }
          }
        })}
      />

      <Gallery
        title='Топ 5 акторів'
        items={actorData.map(actor => {
          return {
            name: actor.name,
            poster: actor.photoUrl,
            link: `/actor/${actor.slug}`,
            content: {
              title: actor.name,
              subTitle: `Кількість фільмів: ${actor.movies.length.toString()}`
            }
          }
        })}
      />
    </>
  )
}

export default Home
