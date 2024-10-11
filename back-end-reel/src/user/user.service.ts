import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnUserObject } from './return-user.object'
import { UpdateUserDto } from './dto/update-user.dto'
import { hash } from 'argon2'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleFavorite(userId: number, movieId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        favorites: true
      }
    })

    if (!user) throw new NotFoundException('User not found')

    const isMovieExist = user.favorites.some(movie => movie.id === movieId)

    const m = await this.prisma.movie.findUnique({
      where: {
        id: movieId
      }
    })

    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        favorites: {
          set: isMovieExist
            ? user.favorites.filter(movie => movie.id !== movieId)
            : [...user.favorites, { id: movieId }]
        }
      }
    })

    return {
      user,
      message: isMovieExist ? 'delete' : 'add'
    }
  }

  async updateProfile(id: number, dto: UpdateUserDto) {
    if (dto.email) {
      const isSameUser = await this.prisma.user.findUnique({
        where: {
          email: dto.email
        }
      })

      if (isSameUser && id !== isSameUser.id) {
        throw new BadRequestException('Email already in use')
      }
    }

    const user = await this.getById(id)

    return this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        password: dto.password ? await hash(dto.password) : user.password
      }
    })
  }

  // START ADMIN PANEL

  async getAll(currentUserId: number, searchTerm?: string) {
    if (searchTerm) return this.search(searchTerm)

    const users = await this.prisma.user.findMany({
      select: { ...returnUserObject, createdAt: true },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const remainingUsers = users.filter(user => user.id !== currentUserId)

    const sortedUsers = remainingUsers.sort((a, b) => {
      if (a.role === 'ADMIN' && b.role !== 'ADMIN') {
        return -1
      }
      if (a.role !== 'ADMIN' && b.role === 'ADMIN') {
        return 1
      }
    })

    return sortedUsers
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) throw new NotFoundException('User not found')

    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async getById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        favorites: true
      }
    })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async search(searchTerm: string) {
    return this.prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      }
    })
  }

  async updateUserRole(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) throw new NotFoundException('User not found')

    const newRole = user.role === 'USER' ? 'ADMIN' : 'USER'

    return this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: newRole
      }
    })
  }

  async delete(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) throw new NotFoundException('User not found')

    return this.prisma.user.delete({
      where: {
        id: userId
      }
    })
  }
}
