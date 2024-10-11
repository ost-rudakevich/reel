export interface IMovieDto {
  title: string
  poster: string
  bigPoster: string
  videoUrl: string
  country: string
  year: number
  duration: number
  genres: number[]
  actors: number[]
}

export enum EnumMoviesEndpoints {
  MOVIES = '/movies'
}
