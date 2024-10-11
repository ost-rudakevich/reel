import { FC } from 'react'
import { useGetAllActorsQuery } from 'services/actor/actor.service'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import Gallery from 'ui/gallery/Gallery'

const ActorsGallery: FC = () => {
  const { data: allActorsData, isLoading, isError } = useGetAllActorsQuery('')

  if (isLoading) {
    return <Loading />
  }

  if (!allActorsData || isError) {
    return <Error error='serverError' />
  }

  return (
    <>
      <Gallery
        title='Усі актори'
        items={allActorsData.map(actor => {
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

export default ActorsGallery
