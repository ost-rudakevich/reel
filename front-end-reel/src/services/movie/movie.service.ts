import { api } from 'services/api'
import { IMovie } from 'types/movie.types'
import { EnumMoviesEndpoints, IMovieDto } from './movie.service.interface'

export const movieApi = api.injectEndpoints({
  endpoints: build => ({
    getAllMovie: build.query<IMovie[], string>({
      query: searchMovie => ({
        url: EnumMoviesEndpoints.MOVIES,
        method: 'GET',
        params: { searchTerm: searchMovie }
      }),

      providesTags: result =>
        result
          ? [
              { type: 'Movie', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Movie' as const, id }))
            ]
          : [{ type: 'Movie', id: 'LIST' }]
    }),
    getMovieBySlug: build.query<IMovie, string>({
      query: slug => ({
        url: `${EnumMoviesEndpoints.MOVIES}/by-slug/${slug}`,
        method: 'GET'
      }),
      providesTags: result => (result ? [{ type: 'Movie', id: result.id }] : [])
    }),
    getMostPopular: build.query<IMovie[], void>({
      query: () => ({
        url: `${EnumMoviesEndpoints.MOVIES}/most-popular`,
        method: 'GET'
      })
    }),
    getByActorId: build.query<IMovie[], number>({
      query: id => ({
        url: `${EnumMoviesEndpoints.MOVIES}/by-actor/${id}`,
        method: 'GET'
      })
    }),
    getMovieByGenreSlug: build.query<IMovie[], string>({
      query: genreSlug => ({
        url: `${EnumMoviesEndpoints.MOVIES}/by-genres-slug/${genreSlug}`,
        method: 'GET'
      })
    }),
    getMovieByGenre: build.query<IMovie[], number[]>({
      query: genreArray => ({
        url: `${EnumMoviesEndpoints.MOVIES}/by-genres`,
        method: 'POST',
        body: { genreIds: genreArray }
      })
    }),
    updateCountViews: build.mutation<IMovie, string>({
      query: movieSlug => ({
        url: `${EnumMoviesEndpoints.MOVIES}/update-count-views`,
        method: 'PUT',
        body: { slug: movieSlug }
      }),
      invalidatesTags: [{ type: 'Movie', id: 'LIST' }]
    }),

    //START ADMIN PANEL

    getMovieById: build.query<IMovie, number>({
      query: id => ({
        url: `${EnumMoviesEndpoints.MOVIES}/by-id/${id}`,
        method: 'GET'
      })
    }),
    createMovie: build.mutation<IMovie, void>({
      query: () => ({
        url: `${EnumMoviesEndpoints.MOVIES}/create`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Movie', id: 'LIST' }]
    }),
    updateMovie: build.mutation<IMovie, { id: number; updateData: IMovieDto }>({
      query: ({ id, updateData }) => ({
        url: `${EnumMoviesEndpoints.MOVIES}/update/${id}`,
        method: 'PUT',
        body: updateData
      }),
      invalidatesTags: [{ type: 'Movie', id: 'LIST' }]
    }),
    deleteMovie: build.mutation<IMovie, number>({
      query: id => ({
        url: `${EnumMoviesEndpoints.MOVIES}/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Movie', id: 'LIST' }]
    })
  })
})

export const {
  useGetAllMovieQuery,
  useLazyGetAllMovieQuery,
  useGetMovieBySlugQuery,
  useGetMostPopularQuery,
  useGetByActorIdQuery,
  useGetMovieByGenreSlugQuery,
  useGetMovieByGenreQuery,
  useUpdateCountViewsMutation,
  useGetMovieByIdQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation
} = movieApi
