const express = require('express');
const router = express.Router();
const {
  fncCrearPieza,
  fncObtenerPiezas,
  fncObtenerPiezaPorId,
  fncActualizarPieza,
  fncEliminarPieza
} = require('../controllers/piezaController');
const fncVerificarToken = require('../middleware/auth');

router.get('/', fncVerificarToken, fncObtenerPiezas);
router.get('/:id', fncVerificarToken, fncObtenerPiezaPorId);

router.post('/', fncVerificarToken, fncCrearPieza);
router.put('/:id', fncVerificarToken, fncActualizarPieza);
router.patch('/:id', fncVerificarToken, fncActualizarPieza);
router.delete('/:id', fncVerificarToken, fncEliminarPieza);

module.exports = router;
