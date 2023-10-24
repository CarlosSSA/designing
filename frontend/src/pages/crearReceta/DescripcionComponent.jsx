import { TextField } from "@mui/material";

const DescripcionComponent = ({descripcion, handleChange}) => {

    const handleDescriptionChange = (event) => {
        const { name, value } = event.target;
        handleChange(name, value); // Aquí envías el nombre del campo y el valor al componente padre
    };

    return (
        <>  
            <TextField
                id="outlined-textarea"            
                placeholder="Descripcion de la Receta"
                multiline
                name="descripcion"
                value={descripcion}
                onChange={handleDescriptionChange}
                required
            />
        </>
    );
}

export default DescripcionComponent;

