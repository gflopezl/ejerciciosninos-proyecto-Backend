const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Esquema actualizado con campo `rol`
const usuarioSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, default: 'usuario' } // Puede ser 'usuario' o 'admin'
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear nuevo usuario
router.post('/', async (req, res) => {
  const usuario = new Usuario({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol || 'usuario' // por defecto será 'usuario' si no se especifica
  });

  try {
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
