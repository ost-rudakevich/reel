import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { GenreService } from './genre.service'
import { UpdateGenreDto } from './dto/update-genre.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.genreService.getAll(searchTerm)
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.genreService.getBySlug(slug)
  }

  //  START ADMIN PANEL

  @Get('by-id/:id')
  @Auth('ADMIN')
  async getById(@Param('id') id: string) {
    return this.genreService.getById(+id)
  }

  @Post('create')
  @Auth('ADMIN')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create() {
    return this.genreService.create()
  }

  @Put('update/:id')
  @Auth('ADMIN')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    return this.genreService.update(+id, dto)
  }

  @Delete('delete/:id')
  @Auth('ADMIN')
  async delete(@Param('id') id: string) {
    return this.genreService.delete(+id)
  }
}
