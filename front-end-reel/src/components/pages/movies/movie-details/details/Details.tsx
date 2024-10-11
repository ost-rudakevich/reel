import { FC } from 'react'
import styles from './Details.module.scss'
import { IDetailsProps } from './details.interface'
import { useAuth } from 'hooks/useAuth'
import DetailsList from './details-list/DetailsList'
import useGetAverageRating from 'hooks/useGetAverageRating'
import FavoriteButton from './favorite-button/FavoriteButton'
import { Rating } from 'react-simple-star-rating'

const Details: FC<IDetailsProps> = ({ movie }) => {
  const user = useAuth()

  const rating = useGetAverageRating(movie.reviews)

  return (
    <div className={styles.details}>
      {user ? (
        <FavoriteButton movieId={movie.id} name={movie.title} />
      ) : (
        <div></div>
      )}

      <div className={styles.wrapper}>
        <h1>{movie.title}</h1>
        <div className={styles.info}>
          <span>{movie.year} • </span>
          <span>{movie.country} • </span>
          <span>{movie.duration} хв. </span>
        </div>

        <DetailsList
          name='Жанри:'
          links={movie.genres.map(genre => ({
            id: genre.id,
            link: `/genre/${genre.slug}`,
            title: genre.name
          }))}
        />

        <DetailsList
          name='Актори:'
          links={movie.actors.map(actor => ({
            id: actor.id,
            link: `/actor/${actor.slug}`,
            title: actor.name
          }))}
        />

        <div className={styles.rating}>
          <Rating
            readonly
            initialValue={rating}
            SVGstyle={{
              display: 'inline-block'
            }}
            size={25}
            allowFraction
            transition
          />
          <span className={styles.number}>{rating}</span>
        </div>
      </div>
    </div>
  )
}

export default Details
