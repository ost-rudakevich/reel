import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { LoginDto, RegisterDto } from './dto/auth.dto'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { path } from 'app-root-path'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  // РЕЄСТРАЦІЯ КОРИСТУВАЧА

  async registerUser(dto: RegisterDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (oldUser) {
      throw new BadRequestException('Email already exists')
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
        name: dto.name,
        avatarPath: `/uploads/default-avatar.png`
      }
    })

    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens
    }
  }

  // ВХІД КОРИСТУВАЧА

  async loginUser(dto: LoginDto) {
    const user = await this.validateUser(dto)

    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens
    }
  }

  // СТВОРЕННЯ І ПОВЕРНЕННЯ ТОКЕНІВ

  issueTokens(userId: number) {
    const tokensData = { id: userId }

    const accessToken = this.jwt.sign(tokensData, { expiresIn: '1h' })
    const refreshToken = this.jwt.sign(tokensData, { expiresIn: '1d' })

    return {
      accessToken,
      refreshToken
    }
  }

  // ОБНОВЛЕННЯ І ВИДАЧА НОВИХ ТОКЕНІВ ЧЕРЕЗ ПЕРЕВІРКУ ВАЛІДНОСТІ РЕФРЕШ ТОКЕНА

  async getNewToken(dto: RefreshTokenDto) {
    try {
      const result = await this.jwt.verifyAsync(dto.refreshToken)

      const user = await this.prisma.user.findUnique({
        where: {
          id: result.id
        }
      })

      const tokens = await this.issueTokens(user.id)

      return {
        user,
        ...tokens
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  // ПЕРЕВІРКА ДАННИХ КОРСИТУВАЧА ДЛЯ ВХОДУ

  async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      },
      include: {
        favorites: true
      }
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const isValidPassword = await verify(user.password, dto.password)

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password')
    }

    return user
  }
}
