import { IGenre } from './genre.types'
import { IMovie } from './movie.types'

export interface IMainStatistics {
  id: number
  name: string
  value: number
}

export interface ITopFourMovie {
  title: string
  views: number
  slug: string
  poster: string
  genre: IGenre
}

export interface ITopFourActor {
  name: string
  movies: IMovie[]
  slug: string
  photoUrl: string
}
