import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnGenreObject } from './return-genre.object'
import { UpdateGenreDto } from './dto/update-genre.dto'
import { generateSlug } from 'src/utils/generate-slug'

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) return this.search(searchTerm)

    const genresList = await this.prisma.genre.findMany({
      select: returnGenreObject,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return genresList.filter(genre => !genre.name.includes('EmptyGenre'))
  }

  async search(searchTerm: string) {
    await this.prisma.genre.deleteMany({
      where: {
        name: {
          contains: 'EmptyGenre'
        }
      }
    })

    return this.prisma.genre.findMany({
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

  async getBySlug(slug: string) {
    const genre = await this.prisma.genre.findUnique({
      where: {
        slug
      },
      select: returnGenreObject
    })

    if (!genre) throw new NotFoundException('Genre not found')

    return genre
  }

  // START ADMIN PANEL

  async getById(id: number) {
    const genre = await this.prisma.genre.findUnique({
      where: {
        id
      },
      select: returnGenreObject
    })

    if (!genre) throw new NotFoundException('Genre not found')

    return genre
  }

  async create() {
    const genre = await this.prisma.genre.create({
      data: {
        name: '',
        slug: '',
        description: '',
        icon: ''
      }
    })

    const emptyGenreSlug = generateSlug(
      'Empty Genre Number-' + genre.id.toString()
    )

    const updatedGenre = await this.prisma.genre.update({
      where: { id: genre.id },
      data: {
        name: 'EmptyGenreNumber' + genre.id.toString(),
        slug: emptyGenreSlug
      }
    })

    return updatedGenre
  }

  async update(id: number, dto: UpdateGenreDto) {
    const genre = await this.prisma.genre.findUnique({
      where: {
        id
      }
    })

    if (!genre) throw new NotFoundException('Genre not found')

    const dtoSlug = generateSlug(dto.name)

    // slug має бути унікальним в базі данних

    const genreSlug = await this.prisma.genre.findUnique({
      where: {
        slug: dtoSlug
      }
    })

    if (genreSlug && genreSlug.id !== id)
      throw new BadRequestException(`${dto.name} already exists`)

    return this.prisma.genre.update({
      where: { id },
      data: {
        ...dto,
        slug: dtoSlug
      }
    })
  }

  async delete(id: number) {
    const genre = await this.prisma.genre.findUnique({
      where: {
        id
      }
    })

    if (!genre) throw new NotFoundException('Genre not found')

    return this.prisma.genre.delete({
      where: {
        id
      }
    })
  }
}
