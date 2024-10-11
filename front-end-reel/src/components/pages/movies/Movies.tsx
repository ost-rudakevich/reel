import { FC } from 'react'
import { useGetAllMovieQuery } from 'services/movie/movie.service'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import Gallery from 'ui/gallery/Gallery'

const Movies: FC = () => {
  const { data: allMoviesData, isLoading, isError } = useGetAllMovieQuery('')

  if (isLoading) {
    return <Loading />
  }

  if (!allMoviesData || isError) {
    return <Error error='serverError' />
  }

  return (
    <>
      <Gallery
        title='Усі фільми'
        items={allMoviesData.map(movie => {
          return {
            name: movie.title,
            poster: movie.poster,
            link: `/movies/${movie.slug}`,
            content: {
              title: movie.title,
              subTitle: movie.genres[0].name
            }
          }
        })}
      />
    </>
  )
}

export default Movies
