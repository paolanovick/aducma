import express from "express";
import Inscripcion from "../models/Inscripcion.js";
import Curso from "../models/Curso.js";
import { enviarEmailInscripcion } from "../utils/inscripcionService.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const inscripcion = new Inscripcion(req.body);
    await inscripcion.save();
    
    const curso = await Curso.findById(req.body.curso);
    const datosEmail = {
      ...req.body,
      cursoNombre: curso ? curso.titulo : 'Curso'
    };
    
    await enviarEmailInscripcion(datosEmail);
    
    res.status(201).json({ mensaje: "Inscripcion enviada correctamente" });
  } catch (err) {
    console.error("Error inscripcion:", err);
    res.status(500).json({ mensaje: "Error al enviar inscripcion" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const inscripciones = await Inscripcion.find()
      .populate("curso", "titulo")
      .sort({ createdAt: -1 });
    res.json(inscripciones);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener inscripciones" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Inscripcion.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Inscripcion eliminada" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar" });
  }
});

export default router;
