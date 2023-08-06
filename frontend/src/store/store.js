/* import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import recipesSlice from './recipes/recipesSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice,
    recipes: recipesSlice    
  },
})

*/

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from './auth/authSlice';
import recipesSlice from './recipes/recipesSlice';

const persistConfig = {
  key: 'root',
  storage,
  //whitelist: ['auth'] // sólo persiste el estado 'auth'
};

const rootReducer = {
  auth: authSlice,
  recipes: recipesSlice
};


const persistedReducer = {
  auth: persistReducer(persistConfig, authSlice),
  recipes: recipesSlice
};

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);