import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import './App.css'
import { AppRouter } from './router/AppRouter';
import PrimarySearchAppBar from './ui/NavBar'
import { Container } from '@mui/material';
import Footer from './ui/Footer';



export const RecipeApp = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <PrimarySearchAppBar />
        <Container maxWidth="100%" disableGutters>
          <AppRouter />
        <Footer />
        </Container>
      </BrowserRouter>
    </Provider>
  )
}


export default RecipeApp
