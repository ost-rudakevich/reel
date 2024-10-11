import { api } from '../api'
import { IActor, IActorEdit } from 'types/actor.types'
import { EnumActorsEndpoints } from './actor.service.interface'

export const actorApi = api.injectEndpoints({
  endpoints: build => ({
    getAllActors: build.query<IActor[], string>({
      query: searchActor => ({
        url: EnumActorsEndpoints.ACTORS,
        method: 'GET',
        params: { searchTerm: searchActor }
      }),
      providesTags: result =>
        result
          ? [
              { type: 'Actor', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Actor' as const, id }))
            ]
          : [{ type: 'Actor', id: 'LIST' }]
    }),
    getActorBySlug: build.query<IActor, string>({
      query: slug => ({
        url: `${EnumActorsEndpoints.ACTORS}/by-slug/${slug}`,
        method: 'GET'
      })
    }),

    // START ADMIN PANEL

    getActorById: build.query<IActor, number>({
      query: id => ({
        url: `${EnumActorsEndpoints.ACTORS}/by-id/${id}`,
        method: 'GET'
      })
    }),
    createActor: build.mutation<IActor, void>({
      query: () => ({
        url: `${EnumActorsEndpoints.ACTORS}/create`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Actor', id: 'LIST' }]
    }),
    updateActor: build.mutation<IActor, { id: number; updateData: IActorEdit }>(
      {
        query: ({ id, updateData }) => ({
          url: `${EnumActorsEndpoints.ACTORS}/update/${id}`,
          method: 'PUT',
          body: updateData
        }),
        invalidatesTags: [{ type: 'Actor', id: 'LIST' }]
      }
    ),
    deleteActor: build.mutation<IActor, number>({
      query: id => ({
        url: `${EnumActorsEndpoints.ACTORS}/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Actor', id: 'LIST' }]
    })
  })
})

export const {
  useGetAllActorsQuery,
  useGetActorBySlugQuery,
  useLazyGetActorBySlugQuery,
  useGetActorByIdQuery,
  useCreateActorMutation,
  useUpdateActorMutation,
  useDeleteActorMutation
} = actorApi
