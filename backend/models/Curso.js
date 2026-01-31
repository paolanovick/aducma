import mongoose from "mongoose";

const CursoSchema = new mongoose.Schema(
  {
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
    height: {
      type: Number,
      default: 400
    },
    activo: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Curso", CursoSchema);
