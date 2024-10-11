import {
  IsArray,
  IsNumber,
  IsString,
  MinLength,
  minLength
} from 'class-validator'

export class UpdateMovieDto {
  @IsString()
  @MinLength(1)
  title: string

  @IsString()
  poster: string

  @IsString()
  bigPoster: string

  @IsString()
  videoUrl: string

  @MinLength(1)
  @IsString()
  country: string

  @IsNumber()
  year: number

  @IsNumber()
  duration: number

  @IsArray()
  @IsNumber({}, { each: true })
  genres: number[]

  @IsArray()
  @IsNumber({}, { each: true })
  actors: number[]
}
