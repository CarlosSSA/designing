import { Rating, Typography } from "@mui/material";
import { useState } from "react";


const DificultadComponent = ({handleChange})=>{
    const [value, setValue] = useState(0)

    const handleRatingChange = (event, newValue) => {
        setValue(newValue);
        handleChange('dificultad', newValue); 
    };

    return <>
        <Typography component="legend">Dificultad</Typography>
       

            <Rating
            name="simple-controlled"
            value={value}
            onChange={handleRatingChange}
            size="large" 
            style={{ transform: 'scale(2.5)' }}
            />
                </>

}

export default DificultadComponent;