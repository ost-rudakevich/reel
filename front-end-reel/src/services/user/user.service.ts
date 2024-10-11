import { api } from 'services/api'
import { IUser } from 'types/user.types'
import {
  EnumUsersEndpoints,
  IToggleFavoriteResponse,
  IUsersDto
} from './user.service.interface'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getAllUsers: build.query<IUser[], string>({
      query: searchUsers => ({
        url: EnumUsersEndpoints.USERS,
        method: 'GET',
        params: { searchTerm: searchUsers }
      }),
      providesTags: result =>
        result
          ? [
              { type: 'User', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'User' as const, id }))
            ]
          : [{ type: 'User', id: 'LIST' }]
    }),
    getUserProfile: build.query<IUser, void>({
      query: () => ({
        url: `${EnumUsersEndpoints.USERS}/profile`,
        method: 'GET'
      }),
      providesTags: () => [{ type: 'User', id: 'LIST' }]
    }),
    updateUserProfile: build.mutation<IUser, IUsersDto>({
      query: userData => ({
        url: `${EnumUsersEndpoints.USERS}/profile/update`,
        method: 'PUT',
        body: userData
      })
    }),
    toggleFavorite: build.mutation<IToggleFavoriteResponse, number>({
      query: movieId => ({
        url: `${EnumUsersEndpoints.USERS}/profile/favorites`,
        method: 'POST',
        body: { movieId }
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }]
    }),
    updateUserRole: build.mutation<IUser, number>({
      query: id => ({
        url: `${EnumUsersEndpoints.USERS}/update-role/${id}`,
        method: 'PUT'
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }]
    })
  })
})

export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useToggleFavoriteMutation,
  useUpdateUserRoleMutation
} = userApi
