import React, { useState, useEffect } from 'react';
import './IngredientUpload.css';
import { uploadImage } from '../../hooks/useFireBase'
import { Button } from '@mui/material';
import { useIngredientStore } from '../../hooks/useIngredientStore';



const IngredientUpload = () => { 

    const {startCreateIngredient} = useIngredientStore()

  const [selectedImage, setSelectedImage] = useState(null); // Nuevo estado para la imagen seleccionada

  const [ingrediente, setIngrediente] = useState({
      nombre: '',
      descripcion: '',
      kcal: 100,      
      proteinas: { cantidad: 0 },
      hcs: { cantidad: 0 },
      grasas: { cantidad: 0 },
      unidad:{
         pieza: 0,
         cucharada: 0,  
         cucharadita: 0,
         gramos: 1,
         litros:0,
         mililitros:0,
         vaso:0
         },
      grasasSaturadas: { cantidad: 0 },
      colesterol: { cantidad: 0 },
      sodio: { cantidad: 0 },
      potasio: { cantidad: 0 },
      fibra: { cantidad: 0 },
      azucares: { cantidad: 0 },
      sal: { cantidad: 0 },
      vitaminaC: { cantidad: 0 },
      vitaminaD: { cantidad: 0 },
      hierro: { cantidad: 0 },
      calcio: { cantidad: 0 },
      vitaminaB6: { cantidad: 0 },
      magnesio: { cantidad: 0 },
      vitaminaB12: { cantidad: 0 },
      fosforo: { cantidad: 0 },
      vitaminaA: { cantidad: 0 },
      vitaminaE: { cantidad: 0 },
      vitaminaK: { cantidad: 0 },
      zinc: { cantidad: 0 },
      selenio: { cantidad: 0 },
      yodo: { cantidad: 0 },
      acidoFolico: { cantidad: 0 },
      cobre: { cantidad: 0 },
      vitaminaB1: { cantidad: 0 },
      vitaminaB2: { cantidad: 0 },
      vitaminaB3: { cantidad: 0 },
      vitaminaB5: { cantidad: 0 },
      vitaminaB7: { cantidad: 0 },
      cromo: { cantidad: 0 },
      omega3: { cantidad: 0 },
      omega6: { cantidad: 0 },
      omega9: { cantidad: 0 },
      autor: "",
      marca: "",
      supermercado:"",
      precio:0,
      imagenUrl:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Dividimos el nombre por puntos, por ejemplo: "hcs.cantidad" se convierte en ["hcs", "cantidad"]
    const nameParts = name.split(".");
  
    setIngrediente(prevState => {
      let updatedState = { ...prevState };
  
      // Si el nombre tiene un punto, asumimos que es una propiedad anidada
      if (nameParts.length > 1) {
        let lastPart = updatedState;
        for (let i = 0; i < nameParts.length - 1; i++) {
          lastPart = lastPart[nameParts[i]];
        }
  
        // Si el último segmento del nombre es "cantidad" o es "kcal", convertimos el valor a entero
        const shouldConvertToInt = nameParts[nameParts.length - 1] === "cantidad" || nameParts[0] === "unidad" || name === "kcal";
        const processedValue = shouldConvertToInt 
        ? parseInt(value, 10) 
        : value;
  
        lastPart[nameParts[nameParts.length - 1]] = processedValue;
      } else {
        if(name === "kcal"){
            updatedState[name] = parseInt(value, 10);
        } else {
            updatedState[name] = value;
        }
      }
  
      return updatedState;
    });
};

  const handleSubmit = (e) => {
      e.preventDefault();
      
      // Aquí puedes hacer la llamada a tu API para guardar el ingrediente.
      console.log(ingrediente);
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log("handleImageUpload WTF", selectedImage )
    }
  };

  const handleSave = async () => {
    if (selectedImage) {
      try {
        const imagenUrl = await uploadImage(selectedImage);  // Sube la imagen y obtiene la URL
        setIngrediente((prev) => ({
          ...prev,
          imagenUrl
        }));
        console.log("Sube a Firebase??",imagenUrl )
        console.log("y que tengo de estado? WTF", ingrediente)
        await startCreateIngredient(ingrediente )
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    }

    // Aquí también puedes guardar el nombre y la descripción en una base de datos si es necesario
  };

  useEffect(() => {
    if(ingrediente.imagenUrl !== ""){
        console.log("cambia el estado con la imagen?", ingrediente)
        //aqui enviar el objeto al controlador
    }
  
    
  }, [ingrediente.imagenUrl])
  

  return (
    <div className="ingredient-upload">
      <form onSubmit={handleSubmit}>
        <div className="form-column">
          <div className="form-group">
              <label>Nombre:</label>
              <input type="text" name="nombre" onChange={handleChange} required />
          </div>

          <div className="form-group">
              <label>Descripción:</label>
              <textarea name="descripcion" onChange={handleChange} required></textarea>
          </div>

          <div className="form-group">
              <label>kcal: (cada 100g)</label>
              <input type="number" name="kcal" onChange={handleChange} required />
          </div>

          <div className="form-group">
              <label>Proteínas (cada 100g):</label>
              <input type="number" name="proteinas.cantidad" onChange={handleChange} required />
          </div>

          <div className="form-group">
              <label>Hidratos de Carbono (cada 100g):</label>
              <input type="number" name="hcs.cantidad" onChange={handleChange} required />
          </div>

          <div className="form-group">
              <label>Grasas (cada 100g):</label>
              <input type="number" name="grasas.cantidad" onChange={handleChange} required />
          </div>

          {/* Secciones de unidades */}
          <div className="form-group">
              <label>Unidad - Pieza: (gramos)</label>
              <input type="number" name="unidad.pieza" onChange={handleChange} />
          </div>
          
          <div className="form-group">
              <label>Unidad - Cucharada: (gramos)</label>
              <input type="number" name="unidad.cucharada" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Cucharadita: (gramos)</label>
              <input type="number" name="unidad.cucharadita" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vaso: (gramos)</label>
              <input type="number" name="unidad.vaso" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Litros: (gramos)</label>
              <input type="number" name="unidad.litros" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Mililitros: (gramos)</label>
              <input type="number" name="unidad.mililitros" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Grasas Saturadas: (gramos)</label>
              <input type="number" name="grasasSaturadas.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Colesterol: (miligramos)</label>
              <input type="number" name="colesterol.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Sodio: (miligramos)</label>
              <input type="number" name="sodio.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Potasio: (miligramos)</label>
              <input type="number" name="potasio.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Fibra: (gramos)</label>
              <input type="number" name="fibra.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Azucares: (gramos)</label>
              <input type="number" name="azucares.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Sal: (gramos)</label>
              <input type="number" name="sal.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina C: (miligramos)</label>
              <input type="number" name="vitaminaC.cantidad" onChange={handleChange} />
          </div>
        </div> 
        <div className="form-column">

          <div className="form-group">
              <label>Unidad - Vitamina D: (microgramos)</label>
              <input type="number" name="vitaminaD.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Hierro: (miligramos)</label>
              <input type="number" name="hierro.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Calcio: (miligramos)</label>
              <input type="number" name="calcio.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina B6: (miligramos)</label>
              <input type="number" name="vitaminaB6.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Magnesio: (miligramos)</label>
              <input type="number" name="magnesio.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina B12: (microgramos)</label>
              <input type="number" name="vitaminaB12.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Fosforo: (miligramos)</label>
              <input type="number" name="fosforo.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina A: (microgramos)</label>
              <input type="number" name="vitaminaA.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina E: (miligramos)</label>
              <input type="number" name="vitaminaE.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina K: (microgramos)</label>
              <input type="number" name="vitaminaK.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Zinc: (miligramos)</label>
              <input type="number" name="zinc.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Selenio: (microgramos)</label>
              <input type="number" name="selenio.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Yodo: (microgramos)</label>
              <input type="number" name="yodo.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Acido Folico: (microgramos)</label>
              <input type="number" name="acidoFolico.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Cobre: (microgramos)</label>
              <input type="number" name="cobre.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina B1: (miligramos)</label>
              <input type="number" name="vitaminaB1.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina B2: (microgramos)</label>
              <input type="number" name="vitaminaB2.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina B3: (miligramos)</label>
              <input type="number" name="vitaminaB3.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina B5: (miligramos)</label>
              <input type="number" name="vitaminaB5.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Vitamina B7: (microgramos)</label>
              <input type="number" name="vitaminaB7.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Cromo: (microgramos)</label>
              <input type="number" name="cromo.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Omega 3: (gramos)</label>
              <input type="number" name="omega3.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Omega 6: (gramos)</label>
              <input type="number" name="omega6.cantidad" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Unidad - Omega 9: (gramos)</label>
              <input type="number" name="omega9.cantidad" onChange={handleChange} />
          </div>
          {/* ... [Puedes seguir de manera similar con todos los otros campos de unidades] ... */}

          {/* Otros campos */}
          <div className="form-group">
              <label>Autor:</label>
              <input type="text" name="autor" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Marca:</label>
              <input type="text" name="marca" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Supermercado:</label>
              <input type="text" name="supermercado" onChange={handleChange} />
          </div>

          <div className="form-group">
              <label>Precio:</label>
              <input type="number" name="precio" onChange={handleChange} />
          </div>
        </div> 

        <div className="form-group">
            <label>Imagen:</label>
            <input type="file" onChange={handleImageUpload} />
                <button onClick={handleSave}>Save</button>
                {ingrediente.imagenUrl && <img src={ingrediente.imagenUrl} alt="Ingredient" />}
            </div>

    </form>
  </div>
  );
}

export default IngredientUpload;
