import { TextField } from "@mui/material"


const TitleComponent = ({title, handleChange}) =>{

    return <>
        <TextField
            required
            id="outlined-required"
            placeholder="Título de la Receta"
            value={title}
            onChange={handleChange}
            name = "nombre"
            />
        </>
}

export default TitleComponent
