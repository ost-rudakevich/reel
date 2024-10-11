import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @IsEmail({}, { message: 'Enter a valid email' })
  @IsString({ message: 'Enter your email' })
  email: string

  @IsString({ message: 'Enter your password' })
  @MinLength(6, {
    message: 'Password must be at least 6 characters'
  })
  password: string

  @IsString({ message: 'Enter your name' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  name: string
}

export class LoginDto {
  @IsEmail({}, { message: 'Enter a valid email' })
  @IsString({ message: 'Enter your email' })
  email: string

  @IsString({ message: 'Enter your password' })
  @MinLength(6, {
    message: 'Password must be at least 6 characters'
  })
  password: string
}
