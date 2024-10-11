import { IGenre } from './genre.types'

export interface IActor {
  id: number
  name: string
  slug: string
  photoUrl: string
  dateOfBirth: string
  birthplace: string
  movies: IMovieData[]
}

interface IMovieData {
  id: number
  genres: IGenre[]
  bigPoster: string
  title: string
  slug: string
}

export interface IActorEdit extends Omit<IActor, 'id' | 'movies' | 'slug'> {}
