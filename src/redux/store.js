
import { configureStore } from '@reduxjs/toolkit'
import contactReducer from '../redux/contactSLice'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter']
}

const persistedContactsReducer = persistReducer(persistConfig,contactReducer)

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
     },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
