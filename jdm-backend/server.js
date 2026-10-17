require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const piezaRoutes = require('./routes/piezaRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/piezas', piezaRoutes);
app.use('/api/usuarios', require('./routes/usuarioRoutes'));

app.get('/', (req, res) => {
  res.send('API de Tienda JDM funcionando correctamente');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});