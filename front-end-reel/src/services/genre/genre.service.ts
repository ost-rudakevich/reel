import { api } from '../api'
import { EnumGenresEndpoints } from './genre.service.interface'
import { IGenre, IGenreEdit } from 'types/genre.types'

export const genreApi = api.injectEndpoints({
  endpoints: build => ({
    getAllGenre: build.query<IGenre[], string>({
      query: searchGenre => ({
        url: EnumGenresEndpoints.GENRES,
        method: 'GET',
        params: { searchTerm: searchGenre }
      }),
      providesTags: result =>
        result
          ? [
              { type: 'Genre', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Genre' as const, id }))
            ]
          : [{ type: 'Genre', id: 'LIST' }]
    }),
    getGenreBySlug: build.query<IGenre, string>({
      query: slug => ({
        url: `${EnumGenresEndpoints.GENRES}/by-slug/${slug}`,
        method: 'GET'
      })
    }),

    // START ADMIN PANEL

    getGenreById: build.query<IGenre, number>({
      query: id => ({
        url: `${EnumGenresEndpoints.GENRES}/by-id/${id}`,
        method: 'GET'
      })
    }),
    createGenre: build.mutation<IGenre, void>({
      query: () => ({
        url: `${EnumGenresEndpoints.GENRES}/create`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Genre', id: 'LIST' }]
    }),
    updateGenre: build.mutation<IGenre, { id: number; updateData: IGenreEdit }>(
      {
        query: ({ id, updateData }) => ({
          url: `${EnumGenresEndpoints.GENRES}/update/${id}`,
          method: 'PUT',
          body: updateData
        }),
        invalidatesTags: [{ type: 'Genre', id: 'LIST' }]
      }
    ),
    deleteGenre: build.mutation<IGenre, number>({
      query: id => ({
        url: `${EnumGenresEndpoints.GENRES}/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Genre', id: 'LIST' }]
    })
  })
})

export const {
  useGetAllGenreQuery,
  useGetGenreBySlugQuery,
  useGetGenreByIdQuery,
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation
} = genreApi
