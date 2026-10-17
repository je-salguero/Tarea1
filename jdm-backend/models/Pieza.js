const mongoose = require('mongoose');

const piezaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  marca: { type: String, required: true }, 
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  compatibleCon: { type: String } 
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Pieza', piezaSchema);