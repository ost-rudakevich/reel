import { IMovie } from 'types/movie.types'

export interface IDetailsProps {
  movie: IMovie
}

export interface IDetailsListProps {
  name: string
  links: ILink[]
}

export interface ILink {
  id: number
  link: string
  title: string
}

export interface IFavoriteButtonProps {
  movieId: number
  name: string
}
