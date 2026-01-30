const mongoose = require('mongoose');

const NovedadSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  imagenPublicId: {
    type: String
  },
  height: {
    type: Number,
    default: 400
  },
  activo: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Novedad', NovedadSchema);