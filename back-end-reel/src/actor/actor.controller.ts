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
import { ActorService } from './actor.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UpdateActorDto } from './dto/update-actor.dto'

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.actorService.getAll(searchTerm)
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.actorService.getBySlug(slug)
  }

  //  START ADMIN PANEL

  @Get('by-id/:id')
  @Auth('ADMIN')
  async getById(@Param('id') id: string) {
    return this.actorService.getById(+id)
  }

  @Post('create')
  @Auth('ADMIN')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create() {
    return this.actorService.create()
  }

  @Put('update/:id')
  @Auth('ADMIN')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() dto: UpdateActorDto) {
    return this.actorService.update(+id, dto)
  }

  @Delete('delete/:id')
  @Auth('ADMIN')
  async delete(@Param('id') id: string) {
    return this.actorService.delete(+id)
  }
}
