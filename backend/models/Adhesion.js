import mongoose from "mongoose";

const AdhesionSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: String,
    ciudad: String,
    mensaje: String
  },
  { timestamps: true }
);

export default mongoose.model("Adhesion", AdhesionSchema);
