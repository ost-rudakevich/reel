import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const BASE_URL = import.meta.env.VITE_SERVER_URL

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = Cookies.get('accessToken') || getState

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
  reducerPath: 'splitApi',
  tagTypes: ['User', 'Movie', 'Genre', 'Actor', 'File', 'Review'],
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: false,
  keepUnusedDataFor: 300,
  endpoints: () => ({})
})
