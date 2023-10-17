import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';
// const tempRecipe =   {
//     _id: new Date().getTime(),
//     title: 'Cumpleaños del Jefe',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Fernando'
//     }
// };


export const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        isLoadingEvents: true,
        searchFilter: null,
        recipeFilter: null,
        error: null,
        recipes: [
            // tempEvent
        ],
        liked: [],
        favs: [],
        activeRecipe: null,
        createRecipe: {}
    },
    reducers: {

        onSetError: (state, action) => {
            state.error = action.payload;
        },
        onClearError: (state) => {
            state.error = null;
        },

        onSetSearchFilter: (state, action) => {
            state.searchFilter = action.payload;
        },

        onClearSearchFilter: (state) => {
            state.searchFilter = null;
        },

        onSetRecipeFilter: (state, action) => {
            state.recipeFilter = action.payload;
        },

        onClearRecipeFilter: (state) => {
            state.recipeFilter = null;
        },

        onSetActiveRecipe: ( state, { payload }) => {
            state.activeRecipe = payload; // hay un problema al recibir el payload
        },
        
        onAddNewRecipe: ( state, { payload }) => {
            state.recipes.push( payload );
            state.activeRecipe = null;
        },
        onUpdateRecipe: ( state, { payload } ) => {
            state.recipes = state.recipes.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }

                return event;
            });
        },
        onDeleteRecipe: ( state ) => {
            if ( state.activeRecipe ) {
                state.recipes = state.recipes.filter( event => event.id !== state.activeRecipe.id );
                state.activeRecipe = null;
            }
        },
        onLoadRecipes: (state,  payload = [] ) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach( event => {
                const exists = state.recetas.some( dbEvent => dbEvent.id === event.id );
                if ( !exists ) {
                    state.recetas.push( event )
                }
            })
        },
        // FOCO A ESTA --> FUNCIONA!!!! no se para que lo queria
        onLoadUserRecipes: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach( event => {
                console.log(event);
                const exists = state.recipes.some( dbEvent => dbEvent._id === event._id ); //Estado VS Payload boolean
                if ( !exists ) {
                    state.recipes.push( event )
                }
            })
        },
        onLogoutRecipe: ( state ) => {
            state.isLoadingEvents = true,
            state.recipes      = []
            state.activeRecipe = null
        },
        onFormRecipe: (state, payload) => {
            state.createRecipe = payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetError, onClearError, onSetRecipeFilter, onClearRecipeFilter, onSetSearchFilter, onClearSearchFilter, onLoadUserRecipes, onSetActiveRecipe, onAddNewRecipe, onUpdateRecipe, onDeleteRecipe, onLoadRecipes, onLogoutRecipe, onCreateRecipe,onFormRecipe  } = recipesSlice.actions

export default recipesSlice.reducer