import { FC } from 'react'
import { useGetUserProfileQuery } from 'services/user/user.service'
import Gallery from 'ui/gallery/Gallery'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'

const Favourites: FC = () => {
  const {
    data: user,
    isError,
    isLoading
  } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError || !user) {
    return <Error error='serverError' />
  }

  return (
    <>
      <Gallery
        title='Ваш список улюблених фільмів!'
        variant='horizontal'
        items={user.favorites.map(favorite => {
          return {
            name: favorite.title,
            poster: favorite.bigPoster,
            link: `/movies/${favorite.slug}`,
            content: {
              title: favorite.title
            }
          }
        })}
      />
    </>
  )
}

export default Favourites
