import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserInitialState } from './userSlice.interface'
import { IUser } from 'types/user.types'
import { removeFromStorage } from 'services/auth/auth.helper'
import { authApi } from 'services/auth/auth.service'

const initialState: IUserInitialState = {
  user: null
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      if (action.payload === null) {
        state.user = null
        removeFromStorage()
        return
      }
      state.user = { ...action.payload }
    }
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user
      }
    )
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user
      }
    )
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
