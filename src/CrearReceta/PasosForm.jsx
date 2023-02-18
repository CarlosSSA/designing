import { TextField, Button, InputAdornment} from "@mui/material";
import { useState } from "react";

const PasosForm = ({addPaso, pasos}) => {
    const [paso, setPaso] = useState("");      
  
    const handleSubmit = (event) => {
      event.preventDefault();
      addPaso(paso);
      setPaso("");
    };

    //esto era para subir una imagen xo se puede borrar
    
  
    return (
      <form onSubmit={addPaso(paso)} style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <TextField
            label="Paso"
            value={paso}
            onChange={(event) => setPaso(event.target.value)}
            margin="normal"
          />
          
          <Button type="submit" variant="contained" color="primary">
            Ave
          </Button>
        </div>
      </form>
    );
  };

export default PasosForm