import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { useState } from "react";



    
const TimeComponent = ({ tiempo, handleChange }) => {

  const handleTimeChange = (event) => {
      const { name, value } = event.target;
      setTime(value);
      handleChange(name, value);
  };

  return (
      <>
          <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"><AccessAlarmsIcon /></InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tiempo}
                      label="Age"
                      onChange={handleTimeChange}
                      name="tiempo"
                  >
                      <MenuItem value={15}>&lt;15</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={45}>45</MenuItem>
                      <MenuItem value={60}>&gt;45</MenuItem>
                  </Select>
              </FormControl>
          </Box>
      </>
  );
}

export default TimeComponent;