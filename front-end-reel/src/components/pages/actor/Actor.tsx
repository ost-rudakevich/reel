import { FC } from 'react'
import styles from './Actor.module.scss'
import { useGetActorBySlugQuery } from 'services/actor/actor.service'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import { useParams } from 'react-router-dom'
import { formatDate } from 'utils/form-data'
import Gallery from 'ui/gallery/Gallery'

const Actor: FC = () => {
  const { actorSlug = '' } = useParams()
  const {
    data: actorData,
    isError,
    isLoading
  } = useGetActorBySlugQuery(actorSlug)

  if (isLoading) {
    return <Loading />
  }

  if (isError || !actorData) {
    return <Error error='serverError' />
  }

  const genres = [
    ...new Set(actorData.movies.map(movie => movie.genres[0].name))
  ].slice(0, 4)

  return (
    <div className={styles.actor}>
      <div className={styles.title}>
        <img src={actorData.photoUrl} alt={actorData.name} />
        <div className={styles.wrapper}>
          <h1 className={styles.name}>{actorData.name}</h1>
          <div className={styles.info}>
            <span>Країна: {actorData.birthplace}</span>
            <span>Дата народження: {formatDate(actorData.dateOfBirth)}р.</span>
            <span>Кількість зіграней ролей: {actorData.movies.length}</span>
            <span>Жанри:</span>
            <div className={styles.genres}>
              {genres.map(genre => {
                return <span key={genre}>{genre}</span>
              })}
            </div>
          </div>
        </div>
      </div>

      <Gallery
        title='Фільми, у яких приймав участь актор'
        variant='horizontal'
        items={actorData.movies.map(movie => {
          return {
            name: movie.title,
            poster: movie.bigPoster,
            link: `/movies/${movie.slug}`,
            content: {
              title: movie.title,
              subTitle: movie.genres[0].name
            }
          }
        })}
      />
    </div>
  )
}

export default Actor
