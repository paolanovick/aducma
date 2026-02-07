import express from "express";
import Adhesion from "../models/Adhesion.js";
import { enviarEmailAdhesion } from "../utils/adhesionService.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const adhesion = new Adhesion(req.body);
    await adhesion.save();
    await enviarEmailAdhesion(req.body);
    res.status(201).json({ mensaje: "Adhesion enviada correctamente" });
  } catch (err) {
    console.error("Error adhesion:", err);
    res.status(500).json({ mensaje: "Error al enviar adhesion" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const adhesiones = await Adhesion.find().sort({ createdAt: -1 });
    res.json(adhesiones);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener adhesiones" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Adhesion.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Adhesion eliminada" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar" });
  }
});

export default router;
