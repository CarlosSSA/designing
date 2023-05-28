import { TextField } from "@mui/material";

const PorcionesComponent = ({porciones, handleChange})=>{
    return <>
        <TextField
                id="outlined-helperText"
                label="Porciones"                
                value={porciones}
                onChange={handleChange}
                name="porciones"                
        />
    </>

}

export default PorcionesComponent;

