import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

import contactReducer from '../redux/contactSLice';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
setupListeners(store.dispatch);
