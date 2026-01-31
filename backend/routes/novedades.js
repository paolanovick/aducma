import express from "express";
import cloudinary from "cloudinary";
import Novedad from "../models/Novedad.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Configurar Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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

    // Subir imagen a Cloudinary
    const resultado = await cloudinary.v2.uploader.upload(imagen, {
      folder: "aducma/novedades",
      transformation: [{ quality: "auto:good" }]
    });

    const novedad = new Novedad({
      titulo,
      descripcion,
      contenido,
      fecha,
      imagen: resultado.secure_url,
      imagenPublicId: resultado.public_id,
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

    // Si hay nueva imagen
    if (imagen && imagen.startsWith("data:")) {
      if (novedad.imagenPublicId) {
        await cloudinary.v2.uploader.destroy(novedad.imagenPublicId);
      }

      const resultado = await cloudinary.v2.uploader.upload(imagen, {
        folder: "aducma/novedades",
        transformation: [{ quality: "auto:good" }]
      });

      novedad.imagen = resultado.secure_url;
      novedad.imagenPublicId = resultado.public_id;
    }

    novedad.titulo = titulo ?? novedad.titulo;
    novedad.descripcion = descripcion ?? novedad.descripcion;
    novedad.contenido = contenido ?? novedad.contenido;
    novedad.fecha = fecha ?? novedad.fecha;
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

    if (novedad.imagenPublicId) {
      await cloudinary.v2.uploader.destroy(novedad.imagenPublicId);
    }

    await Novedad.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Novedad eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar novedad", error });
  }
});

export default router;
