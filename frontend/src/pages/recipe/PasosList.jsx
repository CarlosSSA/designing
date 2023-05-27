// StepList.js
import React from 'react';
import { Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

const PasosList = ({ pasos }) => {
  return (
    <List>
      {pasos.map((step, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar
              style={{
                backgroundColor: '#e0e0e0',
                color: '#616161',
                fontWeight: 'bold',
              }}
            >
              {index + 1}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                variant="subtitle1"
                component="div"
                style={{
                  fontWeight: 'bold',
                }}
              >
                {`Paso ${index + 1}`}
              </Typography>
            }
            secondary={
              <Typography
                variant="body2"
                component="div"
                color="text.secondary"
              >
                {step}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PasosList;
