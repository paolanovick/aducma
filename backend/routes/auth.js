const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { usuario, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, usuario });
  } else {
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
});

// GET /api/auth/verificar
router.get('/verificar', require('../middleware/auth'), (req, res) => {
  res.json({ valid: true, usuario: req.admin.usuario });
});

module.exports = router;