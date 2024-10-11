import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateGenreDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  name: string

  @IsString()
  @IsOptional()
  @MaxLength(50)
  description: string

  @IsString()
  @IsOptional()
  @MinLength(1)
  icon: string
}
