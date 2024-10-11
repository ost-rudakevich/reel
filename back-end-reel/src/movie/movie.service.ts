import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnMovieObject } from './return-movie.object'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { generateSlug } from 'src/utils/generate-slug'

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) return this.search(searchTerm)

    const movies = await this.prisma.movie.findMany({
      select: returnMovieObject,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return movies.filter(movie => !movie.title.includes('EmptyMovie'))
  }

  async search(searchTerm: string) {
    await this.prisma.movie.deleteMany({
      where: {
        title: {
          contains: 'EmptyMovie'
        }
      }
    })

    return this.prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      },
      select: returnMovieObject
    })
  }

  async getMostPopular() {
    return this.prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        genres: true,
        actors: true
      },
      take: 8
    })
  }

  async getBySlug(slug: string) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        slug
      },
      select: returnMovieObject
    })

    if (!movie) throw new NotFoundException('Movie not found')

    return movie
  }

  async getByActor(actorId: number) {
    return this.prisma.movie.findMany({
      where: {
        actors: {
          some: {
            id: actorId
          }
        }
      },
      select: returnMovieObject
    })
  }

  async getByGenreSlug(genreSlug: string) {
    return this.prisma.movie.findMany({
      where: {
        genres: {
          some: {
            slug: genreSlug
          }
        }
      },
      select: returnMovieObject,
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async getByGenresIds(genreIds: number[]) {
    return this.prisma.movie.findMany({
      where: {
        genres: {
          some: {
            id: {
              in: genreIds
            }
          }
        }
      },
      select: returnMovieObject
    })
  }

  async updateCountViews(slug: string) {
    return this.prisma.movie.update({
      where: {
        slug
      },
      data: {
        views: {
          increment: 1
        }
      }
    })
  }

  // START ADMIN PANEL

  async getById(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id
      },
      select: returnMovieObject
    })

    if (!movie) throw new NotFoundException('Movie not found')

    return movie
  }

  async create() {
    const movie = await this.prisma.movie.create({
      data: {
        title: '',
        slug: '',
        bigPoster: '',
        poster: '',
        videoUrl: '',
        rating: 0,
        actors: {
          connect: []
        },
        genres: {
          connect: []
        }
      }
    })

    const emptyMovieSlug = generateSlug(
      'Empty Movie Number-' + movie.id.toString()
    )

    const updatedMovie = await this.prisma.movie.update({
      where: { id: movie.id },
      data: {
        title: 'EmptyMovieNumber' + movie.id.toString(),
        slug: emptyMovieSlug
      }
    })

    return updatedMovie
  }

  async update(id: number, dto: UpdateMovieDto) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id
      }
    })

    if (!movie) throw new NotFoundException('Movie not found')

    const dtoSlug = generateSlug(dto.title)

    // slug має бути унікальним в базі данних

    const movieSlug = await this.prisma.movie.findUnique({
      where: {
        slug: dtoSlug
      }
    })

    if (movieSlug && movieSlug.id !== id)
      throw new BadRequestException(`${dto.title} already exists`)

    return this.prisma.movie.update({
      where: {
        id
      },
      data: {
        ...dto,
        slug: generateSlug(dto.title),
        genres: {
          set: dto.genres?.map(genreId => ({ id: genreId })),
          disconnect: dto.genres
            ?.filter(genreId => !dto.genres.includes(genreId))
            .map(genreId => ({ id: genreId }))
        },
        actors: {
          set: dto.actors?.map(actorId => ({ id: actorId })),
          disconnect: dto.actors
            ?.filter(actorId => !dto.actors.includes(actorId))
            .map(actorId => ({ id: actorId }))
        }
      }
    })
  }

  async delete(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id
      }
    })

    if (!movie) throw new NotFoundException('Movie not found')

    return this.prisma.movie.delete({
      where: {
        id
      }
    })
  }
}
