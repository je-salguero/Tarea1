const express = require('express');
const router = express.Router();
const { 
  crearPieza, 
  obtenerPiezas, 
  obtenerPiezaPorId, 
  actualizarPieza, 
  eliminarPieza 
} = require('../controllers/piezaController');
const auth = require('../middleware/auth');

router.get('/', obtenerPiezas);
router.get('/:id', obtenerPiezaPorId);

router.post('/', auth, crearPieza);
router.put('/:id', auth, actualizarPieza);
router.delete('/:id', auth, eliminarPieza);

module.exports = router;