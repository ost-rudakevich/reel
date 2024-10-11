import {
  Body,
  Controller,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Query
} from '@nestjs/common'
import { UserService } from './user.service'
import { CurrentUser } from './decorators/user.decorator'
import { Auth } from '../auth/decorators/auth.decorator'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.getById(id)
  }

  @Post('profile/favorites')
  @HttpCode(200)
  @Auth()
  async toggleFavorite(
    @CurrentUser('id') userId: number,
    @Body('movieId') movieId: number
  ) {
    return this.userService.toggleFavorite(userId, movieId)
  }

  @Put('profile/update')
  @HttpCode(200)
  @Auth()
  async updateProfile(
    @CurrentUser('id') id: number,
    @Body() dto: UpdateUserDto
  ) {
    return this.userService.updateProfile(id, dto)
  }

  // START ADMIN PANEL

  @Get()
  @Auth('ADMIN')
  async getAll(
    @CurrentUser('id') currentUserId: number,
    @Query('searchTerm') searchTerm?: string
  ) {
    return this.userService.getAll(currentUserId, searchTerm)
  }

  @Get('by-email/:email')
  @Auth('ADMIN')
  async getByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email)
  }

  @Get('by-id/:id')
  @Auth('ADMIN')
  async getById(@Param('id') id: string) {
    return this.userService.getById(+id)
  }

  @UsePipes(new ValidationPipe())
  @Put('update-role/:id')
  @HttpCode(200)
  @Auth('ADMIN')
  async updateUserRole(@Param('id') id: string) {
    return this.userService.updateUserRole(+id)
  }

  @Delete(':id')
  @Auth('ADMIN')
  async delete(@Param('id') id: string) {
    return this.userService.delete(+id)
  }
}
