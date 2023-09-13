import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  altura: { type: Number }, // en centímetros
  pesoActual: { type: Number }, // en kilogramos
  edad: { type: Number },
  genero: { type: String, enum: ['male', 'female'] },
  nivelActividad: {
    type: String,
    enum: ['sedentario', 'ligera', 'moderada', 'muy activo', 'extra activo']
  },
  objetivo: {
    type: String,
    enum: ['perder', 'mantener', 'ganar']
  },
  
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true,     
  },
  recetas: [{ type: Schema.Types.ObjectId, ref: 'Receta' }],
  publicaciones: { type: Number, default: function() { return this.recetas.length }},
  favRecipes: [{ type: Schema.Types.ObjectId, ref: 'Receta' }],
  likedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Receta' }],
  commentedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Receta' }],
  calendarRecipes: [
    {
      receta: { type: Schema.Types.ObjectId, ref: 'Receta' },
      fecha: { type: Date, required: true }
    }
  ],
  kcalObjetivo: {
    type: Number,
    default: 0
  },
  registroPeso: {
    pesos: [Number],
    fechas: [Date]
  },
  premium: {
    type: Boolean,
    fechaAlta: { type: Date, default: null },
    fechaBaja: { type: Date, default: null },
    tipoSubscripcion: { type: String, default: null },
    default: false
  },
  following: [{ type: Schema.Types.ObjectId, ref: 'Usuario', default: 0 }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'Usuario', default: 0 }],
  CDR: {
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
      cantidad: { type: Number, default: 0 }, // Tiene que ser el 8% (0.08) de las kcal totales-
      unidad: { type: String, default: 'gramos' }
    },
  },
});

export default model('Usuario', UsuarioSchema);


/*
Proceso pasa conectar con BBDDD:
1) variable de entorno y le metes un mongoose.connect en un archivo de configuracion
2) lo importas y lo ejecutas en el index
3) creas un modelo con el schema
4) en el controlador de la ruta haces una instancia del modelo y la guardas como  await usuario.save(); xq es una promesa

*/