// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar las rutas
const ejercicioRoutes = require('./routes/ejercicioRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const PORT = process.env.PORT || 3000;

// Usar las rutas
app.use('/api/ejercicios', ejercicioRoutes); // Rutas para los ejercicios
app.use('/api/usuarios', usuarioRoutes);    // Rutas para los usuarios

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Servidor de ejerciciosniños-proyecto funcionando');
});
