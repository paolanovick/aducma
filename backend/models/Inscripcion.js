import mongoose from "mongoose";

const InscripcionSchema = new mongoose.Schema(
  {
    curso: { type: mongoose.Schema.Types.ObjectId, ref: "Curso", required: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: String,
    mensaje: String
  },
  { timestamps: true }
);

export default mongoose.model("Inscripcion", InscripcionSchema);
