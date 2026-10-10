const Usuario = require('../models/User'); 

const agregarPedidos = async (req, res) => {
    try {
        const { nuevosPedidos } = req.body;
        
        const usuario = await Usuario.findById(req.usuario.id); 

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        if (!usuario.pedidos) {
            usuario.pedidos = [];
        }

        usuario.pedidos.push(...nuevosPedidos);
        
        await usuario.save();

        res.status(200).json({ 
            mensaje: 'Pedidos guardados correctamente', 
            pedidos: usuario.pedidos 
        });
    } catch (error) {
        console.error("Error al actualizar pedidos:", error);
        res.status(500).json({ mensaje: 'Hubo un error en el servidor' });
    }
};

module.exports = { agregarPedidos };