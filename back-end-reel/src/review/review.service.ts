import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateReviewDto } from './dto/create-review.dto'

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, movieId: number, dto: CreateReviewDto) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id: movieId
      },
      include: {
        reviews: true
      }
    })

    if (movie.reviews.find(review => review.userId === userId)) {
      throw new BadRequestException('Ви можете залишити лише один вiдгук.')
    }

    return this.prisma.review.create({
      data: {
        ...dto,
        movie: {
          connect: {
            id: movieId
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async delete(reviewId: number, userId: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: reviewId
      }
    })

    if (!review) throw new NotFoundException('Review not found')

    if (review.userId !== userId)
      throw new NotFoundException('You can Not delete')

    return this.prisma.review.delete({
      where: {
        id: reviewId
      }
    })
  }

  //START ADMIN PANEL

  async deleteByAdmin(id: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        id
      }
    })

    if (!review) throw new NotFoundException('Review not found')

    return this.prisma.review.delete({
      where: {
        id
      }
    })
  }
}
