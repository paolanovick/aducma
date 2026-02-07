import express from "express";
import Curso from "../models/Curso.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cursos = await Curso.find({ activo: true }).sort({ createdAt: -1 });
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener cursos" });
  }
});

router.get("/todas", auth, async (req, res) => {
  try {
    const cursos = await Curso.find().sort({ createdAt: -1 });
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener cursos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ mensaje: "Curso no encontrado" });
    res.json(curso);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener curso" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const curso = new Curso(req.body);
    await curso.save();
    res.json(curso);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al crear curso" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(curso);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al actualizar curso" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Curso.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Curso eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar curso" });
  }
});

export default router;
