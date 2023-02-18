import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { useState } from "react";



    
const TimeComponent = ({tiempo, handleChange}) =>{

    const [time, setTime] = useState('');
    
return <>
    
    <Box sx={{ minWidth: 120 }}>    

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"><AccessAlarmsIcon /></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          label="Age"
          onChange={handleChange}
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


}

export default TimeComponent