import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { CreateReviewDto } from './dto/create-review.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create/:movieId')
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(
    @CurrentUser('id') userId: number,
    @Param('movieId') movieId: string,
    @Body() dto: CreateReviewDto
  ) {
    return this.reviewService.create(userId, +movieId, dto)
  }

  @Delete('delete/:reviewId')
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async delete(
    @CurrentUser('id') userId: number,
    @Param('reviewId') reviewId: string
  ) {
    return this.reviewService.delete(parseInt(reviewId, 10), userId)
  }
}
