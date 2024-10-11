import { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useGetMovieByGenreSlugQuery } from 'services/movie/movie.service'
import Loading from 'ui/loading/Loading'
import Gallery from 'ui/gallery/Gallery'
import Error from 'ui/error/Error'

const Genre: FC = () => {
  const { genreSlug = '' } = useParams()
  const {
    data: moviesByGenre,
    isLoading,
    isError
  } = useGetMovieByGenreSlugQuery(genreSlug)
  const { state: locationState } = useLocation()

  if (isLoading) {
    return <Loading />
  }

  if (
    genreSlug === '' ||
    isError ||
    !moviesByGenre ||
    moviesByGenre.length === 0
  ) {
    return <Error error='serverError' />
  }

  return (
    <>
      <Gallery
        title={`Фільми у жанрі ${locationState.name}`}
        items={moviesByGenre.map(movie => {
          return {
            name: movie.title,
            poster: movie.poster,
            link: `/movies/${movie.slug}`,
            content: {
              title: movie.title
            }
          }
        })}
      />
    </>
  )
}

export default Genre
