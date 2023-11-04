import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  status: 'no autenticado', //autenticado, no-autenticado
  user: {},
  errorMessage:undefined, 
  valoresTotales: {a:1}, 
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {

      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined
    },
    
    onLogin: (state, {payload}) => { 
        state.status = 'autenticado';
        state.user = payload;  //aqui meto el payload
        console.log("payload", payload)
        state.errorMessage = undefined;
    }, 

    //intento de thunk un poco fail, ver midu
    onLogout: (state, {payload}) => {
      state.status = 'no autenticado';
      state.user = {};
      state.errorMessage = payload
    },
    onclearErrorMessage: (state) => {
      state.errorMessage = undefined
    },

    onLikeRecipe: (state, action) => {
      
      if (!state.likedRecipes.includes(action.payload)) {
        state.user.likedRecipes.push(action.payload);
      }
    },
    onUnlikeRecipe: (state, action) => {
      
      state.likedRecipes = state.user.likedRecipes.filter(id => id !== action.payload);
    }
  },
    onPremium: (state) => {  //necesito identificar al usuario por payload?
      state.premium = true
    },
    onLoosePremium: (state) => { //necesito identificar al usuario por payload?
      state.premium = false
    },
    onValoresTotales: (state, {payload}) => {  //recibe payload.totales
      state.valoresTotales = payload.totales
      
    },

  },
)

// Action creators are generated for each case reducer function
export const { onLikeRecipe, onUnlikeRecipe, onChecking, onLogin, onThunk, onLogout, onclearErrorMessage, onPremium, onLoosePremium, onValoresTotales } = authSlice.actions

export default authSlice.reducer