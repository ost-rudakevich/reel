import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from 'services/api'
import { userSlice } from './userSlice/userSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  userSlice: userSlice.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userSlice']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
})

export const persistor = persistStore(store)

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({}).concat(api.middleware)
// })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
