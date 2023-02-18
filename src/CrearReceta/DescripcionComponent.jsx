import { TextField } from "@mui/material";

const DescripcionComponent = ({descripcion, handleChange}) => {
    return <>  
        <TextField
            id="outlined-textarea"            
            placeholder="Descripcion de la Receta"
            multiline
            name="descripcion"
            value={descripcion}
            onChange={handleChange}
            required
        />
    </>

}

export default DescripcionComponent;

