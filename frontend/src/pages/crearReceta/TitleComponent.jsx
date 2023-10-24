import { TextField } from "@mui/material"
import { useState } from "react";



const TitleComponent = ({title, handleChange}) =>{

    const handleTitleChange = (event) => {
        const { name, value } = event.target;
        handleChange(name, value); // Aquí envías el nombre del campo y el valor al componente padre
    };

    return (
        <>
            <TextField
                required
                id="outlined-required"
                placeholder="Título de la Receta"
                value={title}
                onChange={handleTitleChange}
                name="nombre"
            />
        </>
    );
}

export default TitleComponent;
