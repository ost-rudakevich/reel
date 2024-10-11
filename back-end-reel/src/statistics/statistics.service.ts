import { Injectable } from '@nestjs/common'
import 'dayjs/locale/ru'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getMainStatistics() {
    const countUsers = await this.prisma.user.count()
    const countMovies = await this.prisma.movie.count()

    const countViews = await this.prisma.movie.aggregate({
      _sum: {
        views: true
      }
    })

    const averageRating = await this.prisma.review.aggregate({
      _avg: {
        rating: true
      }
    })

    const averageMovieRating = await this.prisma.movie.aggregate({
      _avg: {
        rating: true
      }
    })

    return [
      { id: 1, name: 'Перегляди', value: countViews._sum.views },
      { id: 2, name: 'Фільми', value: countMovies },
      { id: 3, name: 'Користувачі', value: countUsers },
      {
        id: 4,
        name: 'Середній рейтинг',
        value: averageRating._avg.rating || 0
      }
    ]
  }

  async getActorsByMovieCount() {
    const actors = await this.prisma.actor.findMany({
      select: {
        name: true,
        photoUrl: true,
        slug: true,
        movies: true
      }
    })

    const topActors = actors
      .sort((a, b) => b.movies.length - a.movies.length)
      .slice(0, 5)

    return topActors
  }

  async getFourPopularMovies() {
    const movies = await this.prisma.movie.findMany({
      select: {
        title: true,
        views: true,
        poster: true,
        slug: true,
        genres: true
      }
    })

    const topMovies = movies.sort((a, b) => b.views - a.views).slice(0, 5)

    return topMovies.map(movie => {
      return {
        ...movie,
        genre: movie.genres[0]
      }
    })
  }
}
