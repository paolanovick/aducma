import express from "express";
import Novedad from "../models/Novedad.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET /api/novedades - Obtener todas (públicas)
router.get("/", async (req, res) => {
  try {
    const novedades = await Novedad.find({ activo: true }).sort({ createdAt: -1 });
    res.json(novedades);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener novedades", error });
  }
});

// GET /api/novedades/todas - Obtener todas incluyendo inactivas (admin)
router.get("/todas", auth, async (req, res) => {
  try {
    const novedades = await Novedad.find().sort({ createdAt: -1 });
    res.json(novedades);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener novedades", error });
  }
});

// GET /api/novedades/:id - Obtener una
router.get("/:id", async (req, res) => {
  try {
    const novedad = await Novedad.findById(req.params.id);
    if (!novedad) {
      return res.status(404).json({ mensaje: "Novedad no encontrada" });
    }
    res.json(novedad);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener novedad", error });
  }
});

// POST /api/novedades - Crear (admin)
router.post("/", auth, async (req, res) => {
  try {
    const { titulo, descripcion, contenido, fecha, imagen, height } = req.body;

    const novedad = new Novedad({
      titulo,
      descripcion,
      contenido,
      fecha,
      imagen,
      height: height || 400
    });

    await novedad.save();
    res.status(201).json(novedad);
  } catch (error) {
    console.error("Error al crear novedad:", error);
    res.status(500).json({ mensaje: "Error al crear novedad", error: error.message });
  }
});

// PUT /api/novedades/:id - Actualizar (admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const { titulo, descripcion, contenido, fecha, imagen, height, activo } = req.body;
    const novedad = await Novedad.findById(req.params.id);

    if (!novedad) {
      return res.status(404).json({ mensaje: "Novedad no encontrada" });
    }

    novedad.titulo = titulo ?? novedad.titulo;
    novedad.descripcion = descripcion ?? novedad.descripcion;
    novedad.contenido = contenido ?? novedad.contenido;
    novedad.fecha = fecha ?? novedad.fecha;
    novedad.imagen = imagen ?? novedad.imagen;
    novedad.height = height ?? novedad.height;
    novedad.activo = activo ?? novedad.activo;

    await novedad.save();
    res.json(novedad);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar novedad", error: error.message });
  }
});

// DELETE /api/novedades/:id - Eliminar (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const novedad = await Novedad.findById(req.params.id);

    if (!novedad) {
      return res.status(404).json({ mensaje: "Novedad no encontrada" });
    }

    await Novedad.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Novedad eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar novedad", error });
  }
});

export default router;
