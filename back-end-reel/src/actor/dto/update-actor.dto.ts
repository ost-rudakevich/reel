import {
  IsDateString,
  IsString,
  MaxDate,
  MinDate,
  MinLength
} from 'class-validator'

export class UpdateActorDto {
  @IsString()
  @MinLength(1)
  name: string

  @IsString()
  photoUrl: string

  @IsDateString()
  // @MinDate(new Date('1900-01-01'), {
  //   message: 'Date of birth must be after January 1, 1900'
  // })
  // @MaxDate(new Date('2024-01-01'), {
  //   message: 'Date of birth must be before January 1, 2024'
  // })
  dateOfBirth: Date

  @IsString()
  @MinLength(1)
  birthplace: string
}
