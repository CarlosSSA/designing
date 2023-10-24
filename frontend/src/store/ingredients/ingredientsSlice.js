import { createSlice } from '@reduxjs/toolkit';



export const ingredientsSlice = createSlice({
    name: 'ingredientes',
    initialState: {           
        totalingredients: [ "a","b" ],        
    },
    reducers: {

        onLoadAllIngredients: (state, action) => {
            state.totalingredients = action.payload;
        },
        
    }
});


// Action creators are generated for each case reducer function
export const { onLoadAllIngredients  } = ingredientsSlice.actions

export default ingredientsSlice.reducer