import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';



function Mainete(props) {
  //const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Titulo
      </Typography>
      <Divider />
      
        <Markdown className="markdown">
          Hola
        </Markdown>
      
    </Grid>
  );
}



export default Mainete;
