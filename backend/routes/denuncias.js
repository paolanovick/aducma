import express from "express";
import Denuncia from "../models/Denuncia.js";
import { enviarEmailDenuncia } from "../utils/denunciaService.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const denuncia = new Denuncia(req.body);
    await denuncia.save();
    
    await enviarEmailDenuncia(req.body);
    
    res.status(201).json({ mensaje: "Denuncia enviada correctamente" });
  } catch (err) {
    console.error("Error denuncia:", err);
    res.status(500).json({ mensaje: "Error al enviar denuncia" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const denuncias = await Denuncia.find().sort({ createdAt: -1 });
    res.json(denuncias);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener denuncias" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Denuncia.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Denuncia eliminada" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const denuncia = await Denuncia.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    res.json(denuncia);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al actualizar estado" });
  }
});

export default router;
