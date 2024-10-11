import { UserRole } from '@prisma/client'
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  @MinLength(6, {
    message: 'Password must be at least 6 characters'
  })
  password: string

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  name: string

  @IsString()
  @IsOptional()
  avatarPath: string
}

export class UpdateUserByAdminDto {
  @IsEnum(UserRole)
  role: UserRole
}
