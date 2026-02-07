import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import novedadesRoutes from "./routes/novedades.js";
import cursosRoutes from "./routes/cursos.js";
import inscripcionesRoutes from "./routes/inscripciones.js";
import adhesionesRoutes from "./routes/adhesiones.js";
import contactosRoutes from "./routes/contactos.js";
import denunciasRoutes from "./routes/denuncias.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://aducma.vercel.app",
    "https://aducma.org.ar",
    "https://www.aducma.org.ar"
  ],
  credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error MongoDB:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/novedades", novedadesRoutes);
app.use("/api/cursos", cursosRoutes);
app.use("/api/inscripciones", inscripcionesRoutes);
app.use("/api/adhesiones", adhesionesRoutes);
app.use("/api/contactos", contactosRoutes);
app.use("/api/denuncias", denunciasRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API ADUCMA funcionando" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
