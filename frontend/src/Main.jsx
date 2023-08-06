import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
<meta name="viewport" content="initial-scale=1, width=device-width" />

import RecipeApp from './App.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


import { persistor, store } from './store/store.js'

 
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <RecipeApp />
          </PersistGate>
      </Provider>
  // </React.StrictMode>
)


// Conseguir popular la home page con TODAS las recetas de la base de datos