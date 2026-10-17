const express = require('express');
const router = express.Router();
const { fncAgregarPedidos } = require('../controllers/usuarioController');
const fncVerificarToken = require('../middleware/auth');

router.put('/pedidos', fncVerificarToken, fncAgregarPedidos);

module.exports = router;
