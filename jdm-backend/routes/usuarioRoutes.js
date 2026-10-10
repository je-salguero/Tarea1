const express = require('express');
const router = express.Router();
const { agregarPedidos } = require('../controllers/usuarioController');
const auth = require('../middleware/auth'); 

router.put('/pedidos', auth, agregarPedidos);

module.exports = router;