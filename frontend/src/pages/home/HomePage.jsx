import * as React from 'react';

import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
import RecipeReviewCard from '../../ui/Tarjeta.jsx'

export default function HomePage() {   
  

  return (
    <>
                 
      <main>
        {/* Hero unit */}
     
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}

          <Grid container spacing={6}>
             <Grid xs={12} sm={6} md={6}>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
              </Grid>
            
          </Grid>
        </Container>
      </main>

    </>
  );
}