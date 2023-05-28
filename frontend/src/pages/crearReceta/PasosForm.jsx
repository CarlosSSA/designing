import { TextField, Button, InputAdornment, FormControl} from "@mui/material";
import { useState } from "react";


const PasosForm = ({addPaso, handleChange}) => {
    const [paso, setPaso] = useState("");  
    
    const handleSubmit = (event) => {
      event.preventDefault();      
      addPaso(paso);
      setPaso("")
      console.log("se lanza un handlesubmit desde PasosForm");
      
    };
   
  
    return (
      <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'space-between'}}>
      <FormControl>
        <div>
          <TextField
            label="Paso"
            value={paso}
            name="pasos"
            onChange={(event) => setPaso(event.target.value)}
            margin="normal"
          />
          
          <Button type="submit" variant="contained" color="primary">
            Ave
          </Button>
        </div>
        </FormControl>  
      </form>
    );
  };

export default PasosForm