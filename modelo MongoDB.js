// backend/models/Ejercicio.js
const mongoose = require('mongoose');

const ejercicioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  duracion: {
    type: Number, // duración en minutos
    required: true,
  },
});

const Ejercicio = mongoose.model('Ejercicio', ejercicioSchema);
module.exports = Ejercicio;
