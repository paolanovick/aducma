import express from "express";
import Contacto from "../models/Contacto.js";
import { enviarEmailContacto } from "../utils/emailService.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const contacto = new Contacto(req.body);
    await contacto.save();

    // ✅ ENVIAR EMAILS
    await enviarEmailContacto(req.body);

    res.status(201).json({ mensaje: "Mensaje enviado correctamente" });
  } catch (err) {
    console.error("Error contacto:", err);
    res.status(500).json({ mensaje: "Error al enviar mensaje" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const contactos = await Contacto.find().sort({ createdAt: -1 });
    res.json(contactos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener contactos" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Contacto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Contacto eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar" });
  }
});

export default router;
