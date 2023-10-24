import { Box, Slider, TextField, Typography } from "@mui/material";
import'./PorcionesComponent.css'

function PorcionesComponent({ porciones, handleChange }) {

    const handleSliderChange = (event, newValue) => {
      handleChange("porciones", newValue);
    };
  
    return (
      <Box sx={{ width: 300 }}>
        <Typography id="discrete-slider" gutterBottom>
          Porciones
        </Typography>
        <Slider
            name="porciones"
            value={porciones}
            onChange={handleSliderChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={20}
            className="mui-slider-color"
            ThumbComponent="span"
            />
      </Box>
    );
}

export default PorcionesComponent;

