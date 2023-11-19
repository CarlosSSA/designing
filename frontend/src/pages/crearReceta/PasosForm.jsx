import { TextField, Button, InputAdornment, FormControl} from "@mui/material";
import { useState } from "react";
import { uploadStepImage } from "../../hooks/useFireBase";




const PasosForm = ({ addPaso }) => {
  const [paso, setPaso] = useState("");
  const [imagenPaso, setImagenPaso] = useState(null); // Guarda el archivo de imagen
  const [imagenPreview, setImagenPreview] = useState(""); // Guarda la URL de previsualización local


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagenPaso(file);
      setImagenPreview(previewUrl);
    }
  };
      
  const handleSubmit = (event) => {
    event.preventDefault();
    if (paso.trim() !== "") {
      const nuevoPaso = {
        texto: paso,
        imagenFile: imagenPaso, // Guardamos el archivo de la imagen
      };
      addPaso(nuevoPaso);
      setPaso("");
      setImagenPaso(null);
      setImagenPreview("");
    }
  };



  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <TextField
        label="Paso"
        value={paso}
        onChange={(e) => setPaso(e.target.value)}
        margin="normal"
        required
      />
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      {imagenPreview && <img src={imagenPreview} alt="Previsualización" style={{ width: '100px', height: '100px', margin: '10px 0' }} />}
      <Button type="submit" variant="contained" color="primary">
        Agregar Paso
      </Button>
    </form>
  );
};

export default PasosForm;