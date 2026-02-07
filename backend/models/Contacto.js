import mongoose from "mongoose";

const ContactoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: String,
    mensaje: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Contacto", ContactoSchema);
