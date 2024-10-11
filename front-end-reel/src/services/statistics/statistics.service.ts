import { api } from 'services/api'
import {
  IMainStatistics,
  ITopFourActor,
  ITopFourMovie
} from 'types/statistics.types'
import { EnumStatisticsEndpoints } from './statistics.service.interface'

export const statisticsApi = api.injectEndpoints({
  endpoints: build => ({
    getMainStatistics: build.query<IMainStatistics[], void>({
      query: () => ({
        url: `${EnumStatisticsEndpoints.STATISTICS}/main`,
        method: 'GET'
      })
    }),
    getFourPopularMovies: build.query<ITopFourMovie[], void>({
      query: () => ({
        url: `${EnumStatisticsEndpoints.STATISTICS}/top-movies`,
        method: 'GET'
      })
    }),
    getPopularActors: build.query<ITopFourActor[], void>({
      query: () => ({
        url: `${EnumStatisticsEndpoints.STATISTICS}/top-actors`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetMainStatisticsQuery,
  useGetFourPopularMoviesQuery,
  useGetPopularActorsQuery
} = statisticsApi
