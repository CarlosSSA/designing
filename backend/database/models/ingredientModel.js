import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const IngredientSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String, required: true },
  cantidad: { type: Number, default: 100 },
  unidad: {
    gramos: { type: Number, default: 1 },
    pieza: { type: Number },
    cucharada: { type: Number },
    cucharadita: { type: Number },
    vaso: { type: Number },
    litros: { type: Number },
    mililitros: { type: Number },
  },
  kcal: { type: Number, required: true },
  proteinas: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'gramos' }
  },
  hcs: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'gramos' }
  },
  grasas: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'gramos' }
  },
  grasasSaturadas: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'gramos' }
  },
  colesterol: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  sodio: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  potasio: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  fibra: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'gramos' }
  },
  azucares: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'gramos' }
  },
  sal: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'gramos' }
  },
  vitaminaC: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  vitaminaD: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  hierro: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  calcio: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  vitaminaB6: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  magnesio: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  vitaminaB12: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  fosforo: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  vitaminaA: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  vitaminaE: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  vitaminaK: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  zinc: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  selenio: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  yodo: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  acidoFolico: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  cobre: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  vitaminaB1: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  vitaminaB2: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  vitaminaB3: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  vitaminaB5: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'miligramos' }
  },
  vitaminaB7: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  cromo: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'microgramos' }
  },
  omega3: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'gramos' }
  },
  omega6: {
    cantidad: { type: Number, default: 0 },
    unidad: { type: String, default: 'gramos' }
  },
  omega9: {
    cantidad: { type: Number, default: 0 }, 
    unidad: { type: String, default: 'gramos' }
  },
  autor:{ type: String, default:"Sistema" },
  marca:{ type: String, default:"" },
  supermercado: { type: String, default:"" },
  precio: { type: Number, default: 0 },
  imagenUrl: { type: String, default: "" },

});

export default model('Ingrediente', IngredientSchema);