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

// Endpoint raíz (opcional antes de conectar)
app.get('/', (req, res) => {
  res.send('Servidor de ejerciciosniños-proyecto funcionando');
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.use('/api/ejercicios', ejercicioRoutes);
    app.use('/api/usuarios', usuarioRoutes);
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));
