import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  Query,
  Body,
  ValidationPipe,
  UsePipes,
  NotFoundException
} from '@nestjs/common'
import { MovieService } from './movie.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm)
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.movieService.getBySlug(slug)
  }

  @Get('most-popular')
  async getMostPopular() {
    return this.movieService.getMostPopular()
  }

  @Get('by-actor/:id')
  @HttpCode(200)
  async getByActor(@Param('id') id: string) {
    return this.movieService.getByActor(+id)
  }

  @Get('by-genres-slug/:slug')
  @HttpCode(200)
  async getByGenresSlug(@Param('slug') genreSlug: string) {
    return this.movieService.getByGenreSlug(genreSlug)
  }

  @Post('by-genres')
  @HttpCode(200)
  async getByGenres(@Body('genreIds') genreIds: number[]) {
    return this.movieService.getByGenresIds(genreIds)
  }

  @Put('update-count-views')
  async updateCountOpened(@Body('slug') slug: string) {
    return this.movieService.updateCountViews(slug)
  }

  //START ADMIN PANEL

  @Get('by-id/:id')
  @Auth('ADMIN')
  async getById(@Param('id') id: string) {
    return this.movieService.getById(+id)
  }

  @Post('create')
  @HttpCode(200)
  @Auth('ADMIN')
  async create() {
    return this.movieService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put('update/:id')
  @HttpCode(200)
  @Auth('ADMIN')
  async update(@Param('id') id: string, @Body() data: UpdateMovieDto) {
    return this.movieService.update(+id, data)
  }

  @Delete('delete/:id')
  @Auth('ADMIN')
  async delete(@Param('id') id: string) {
    return this.movieService.delete(+id)
  }
}
