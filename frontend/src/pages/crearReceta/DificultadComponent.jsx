import { Rating, Typography } from "@mui/material";
import { useState } from "react";


const DificultadComponent = ({handleChange})=>{
    const [value, setValue] = useState(0)

    return <>
        <Typography component="legend">Dificultad</Typography>
            <Rating
            name="dificultad"
            value={value}
            onChange={handleChange}
        />
    </>

}

export default DificultadComponent;