import express from "express";
import Inscripcion from "../models/Inscripcion.js";

const router = express.Router();

// POST /api/inscripciones
router.post("/", async (req, res) => {
  try {
    const inscripcion = new Inscripcion(req.body);
    await inscripcion.save();
    res.json({ mensaje: "Inscripción enviada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al enviar inscripción" });
  }
});

export default router;
