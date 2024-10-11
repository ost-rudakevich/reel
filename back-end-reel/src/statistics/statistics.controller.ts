import { Controller, Get } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { StatisticsService } from './statistics.service'

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('main')
  @Auth('ADMIN')
  async getMainStatistics() {
    return this.statisticsService.getMainStatistics()
  }

  @Get('top-actors')
  async getActorsByMovieCount() {
    return this.statisticsService.getActorsByMovieCount()
  }

  @Get('top-movies')
  async getFourPopularMovies() {
    return this.statisticsService.getFourPopularMovies()
  }
}
