import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ComentarioSchema = new Schema({
  texto: {
    type: String,
    required: true
  },
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
});

export default model('Comentario', ComentarioSchema);