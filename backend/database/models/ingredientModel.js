const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const IngredientSchema = new Schema({
  //PENDINGS!
  //añadir unidades, taza, cucharadita... en otro esquema?
  // investigar la API de Fatsecret
  nombre: {
    type: String,
    required: true,
    unique: true
  }, 
  descripcion: {
    type: String,
    required: true     
  },
  cantidad: {
    type: Number,
    default: 100     
  },
  kcal: {
    type: Number,
    required: true         
  },
  proteinas: {
    type: Number,
    required: true      
  },
  hcs: {
    type: Number,
    required: true      
  },
  grasas: {
    type: Number,
    required: true      
  },
  grasasSaturadas: {
    type: Number    
  },
  colesterol: {
    type: Number     
  },
   sodio: {
    type: Number     
  },
   potasio: {
    type: Number     
  },
   fibra: {
    type: Number     
  },
   azucares: {
    type: Number     
  },
   sal: {
    type: Number     
  },
   vitaminaC: {
    type: Number     
  },
   vitaminaD: {
    type: Number    
  },
   hierro: {
    type: Number    
  },
  calcio: {
    type: Number     
  },
  vitaminaB6: {
    type: Number     
  },
  magnesio: {
    type: Number     
  },
  vitaminaB12: {
    type: Number     
  },
  fosforo: {
    type: Number     
  },
  vitaminaA: {
    type: Number     
  },
  vitaminaE: {
    type: Number     
  },
  vitaminaK: {
    type: Number     
  },
  zinc: {
    type: Number     
  },
  selenio: {
    type: Number     
  },
  yodo: {
    type: Number     
  },
  acidoFolico: {
    type: Number     
  },  
  cobre: {
    type: Number     
  },
  vitaminaB1: {
    type: Number     
  },
  vitaminaB2: {
    type: Number     
  },
  vitaminaB3: {
    type: Number     
  },
  vitaminaB5: {
    type: Number     
  },
  vitaminaB7: {
    type: Number     
  }
 
                 
});

module.exports = model('Ingrediente', IngredientSchema); 