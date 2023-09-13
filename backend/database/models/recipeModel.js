import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const RecipeSchema = new Schema({
  nombre: { type: String },
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  ingredientes: [
    {
      ingrediente: { type: Schema.Types.ObjectId, ref: 'Ingrediente' },
      cantidad: { type: Number, required: true },
      unidad:{ type: String, required: true , default:"lol"}
    }
  ],
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
  descripcion: { type: String },
  pasos: [
    { 
      texto: { type: String, required: true },
      imgURL: { type: String, default: "" } 
    
    }],
  dificultad: { type: Number, default: 0 },
  tiempo: { type: Number, default: 0 },
  porciones: { type: Number, default: 1 },
  kcal: { type: Number },
  proteinas: { type: Number },
  hcs: { type: Number },
  totales: { type: Schema.Types.Mixed, default: {} },
  grasas: { type: Number },
});

export default model('Receta', RecipeSchema);


/* Esto lo rompe
ingredients: [{
	ingredientObject: {type: Schema.Types.ObjectId, ref: 'Ingrediente'},
	quantity: {type: Number, default: 1},
	unit: {type: String, default: 'unit'}
}]
*/ 