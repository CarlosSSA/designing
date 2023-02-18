import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import './App.css'
import { AppRouter } from './router/AppRouter';


export const RecipeApp = () => {

  return (
    <Provider store={ store }>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}


export default RecipeApp
