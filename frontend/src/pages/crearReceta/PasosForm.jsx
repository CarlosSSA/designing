import { TextField, Button, InputAdornment, FormControl} from "@mui/material";
import { useState } from "react";
import { uploadStepImage } from "../../hooks/useFireBase";




const PasosForm = ({ addPaso, handleChange }) => {
  const [paso, setPaso] = useState("");
  const [imagenPaso, setImagenPaso] = useState(""); // Estado para almacenar la URL de previsualización local de la imagen

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Nombre del archivo:", file.name);
      // Paso 1: FileReader = API navegadores, nos da acceso a .readAsDataURL donde el result nos dará una URL tipo data:... en base 64 incrustada directamente en el navegador
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // cuando termina guarda esa url codificada en base64 en el estado
      reader.onloadend = () => {
        setImagenPaso(reader.result); // Esto establecerá la URL de previsualización local en el estado
      };
      

      // Paso 2: Cargar la imagen en Firebase
      try {
        const firebaseURL = await uploadStepImage(file);
        console.log("URL de Firebase:", firebaseURL); // Esta es la URL que deberías guardar en tu base de datos
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (paso.trim() !== "") {
      const nuevoPaso = {
        texto: paso,
        imgURL: imagenPaso,
      };

      addPaso(nuevoPaso);
      setPaso("");         // Resetea el campo de texto del paso
      setImagenPaso("");  // Resetea la URL de previsualización de la imagen
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <FormControl>
        <div>
          <TextField
            label="Paso"
            value={paso}
            onChange={(event) => setPaso(event.target.value)}
            margin="normal"
            required
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagenPaso && <img src={imagenPaso} alt="Previsualización" style={{ width: '50px', height: '50px', marginRight: '10px' }} />} {/* Previsualización de la imagen */}
          <Button type="submit" variant="contained" color="primary">
            Agregar Paso
          </Button>
        </div>
      </FormControl>
    </form>
  );
};

export default PasosForm;