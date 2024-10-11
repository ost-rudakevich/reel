import { api } from 'services/api'
import {
  ILoginDto,
  IRegisterDto,
  EnumAuthEndpoints
} from './auth.service.interface'
import { IAuthResponse } from 'types/auth.types'
import { saveToStorage } from './auth.helper'

const transformResponse = (response: IAuthResponse) => {
  saveToStorage(response)

  return response
}

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<IAuthResponse, ILoginDto>({
      query: userData => ({
        url: `${EnumAuthEndpoints.AUTH}/login`,
        method: 'POST',
        body: userData
      }),
      transformResponse: transformResponse
    }),
    register: build.mutation<IAuthResponse, IRegisterDto>({
      query: userData => ({
        url: `${EnumAuthEndpoints.AUTH}/register`,
        method: 'POST',
        body: userData
      }),
      transformResponse: transformResponse
    }),
    getNewToken: build.mutation<IAuthResponse, string>({
      query: refreshToken => ({
        url: `${EnumAuthEndpoints.AUTH}/login/access-token`,
        method: 'POST',
        body: { refreshToken }
      }),
      transformResponse: transformResponse
    })
  })
})

export const { useLoginMutation, useRegisterMutation, useGetNewTokenMutation } =
  authApi
