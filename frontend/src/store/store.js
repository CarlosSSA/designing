import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import recipesSlice from './recipes/recipesSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice,
    recipes: recipesSlice    
  },
})