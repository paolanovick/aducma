import mongoose from "mongoose";

const DenunciaSchema = new mongoose.Schema(
  {
    categoria: { type: String, required: true },
    motivo: { type: String, required: true },
    nombre: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    ciudad: { type: String, required: true },
    empresa: { type: String, required: true },
    fecha: String,
    descripcion: { type: String, required: true },
    estado: { type: String, default: "pendiente" },
  },
  { timestamps: true }
);

export default mongoose.model("Denuncia", DenunciaSchema);
