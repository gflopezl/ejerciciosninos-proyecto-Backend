const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Definir el esquema directamente
const ejercicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  edadRecomendada: String
});

const Ejercicio = mongoose.model('Ejercicio', ejercicioSchema);

// Ruta para obtener todos los ejercicios
router.get('/', async (req, res) => {
  try {
    const ejercicios = await Ejercicio.find();
    res.json(ejercicios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear un nuevo ejercicio
router.post('/', async (req, res) => {
  const ejercicio = new Ejercicio({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    edadRecomendada: req.body.edadRecomendada
  });

  try {
    const nuevoEjercicio = await ejercicio.save();
    res.status(201).json(nuevoEjercicio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
