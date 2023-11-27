import { BrowserRouter } from 'react-router-dom';
import './App.css'
import PrimarySearchAppBar from './ui/NavBar'
import { Container } from '@mui/material';
import Footer from './ui/Footer';
import HomePage from './pages/home/HomePage'




export const RecipeApp = () => {

  return (
    <>
      <PrimarySearchAppBar/> 
        <Container maxWidth="100%" disableGutters style={{paddingTop:'1px'}}>
          <HomePage />
        <Footer />
        </Container>
      </>
  )
}


export default RecipeApp
