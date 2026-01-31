import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  if (
    usuario === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { usuario, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({ token, usuario });
  }

  return res.status(401).json({ mensaje: "Credenciales incorrectas" });
});

// GET /api/auth/verificar
router.get("/verificar", authMiddleware, (req, res) => {
  res.json({ valid: true, usuario: req.admin.usuario });
});

export default router;
