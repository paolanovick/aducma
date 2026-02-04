import express from "express";
import Adhesion from "../models/Adhesion.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Guardar adhesión (formulario público)
router.post("/", async (req, res) => {
  try {
    const adhesion = new Adhesion(req.body);
    await adhesion.save();
    res.status(201).json({ mensaje: "Adhesión enviada correctamente" });
  } catch (err) {
    console.error("Error adhesión:", err);
    res.status(500).json({ mensaje: "Error al enviar adhesión" });
  }
});

// Listar adhesiones (solo admin)
router.get("/", auth, async (req, res) => {
  try {
    const adhesiones = await Adhesion.find().sort({ createdAt: -1 });
    res.json(adhesiones);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener adhesiones" });
  }
});

export default router;
