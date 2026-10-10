const Pieza = require('../models/Pieza');

const crearPieza = async (req, res) => {
  try {
    const pieza = new Pieza(req.body);
    await pieza.save();
    res.status(201).json(pieza);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la pieza' });
  }
};

const obtenerPiezas = async (req, res) => {
  try {
    const piezas = await Pieza.find(req.query);
    res.json(piezas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el catálogo' });
  }
};

const obtenerPiezaPorId = async (req, res) => {
  try {
    const pieza = await Pieza.findById(req.params.id);
    if (!pieza) {
      return res.status(404).json({ mensaje: 'Pieza no encontrada' });
    }
    res.json(pieza);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar la pieza por ID' });
  }
};

const actualizarPieza = async (req, res) => {
  try {
    const pieza = await Pieza.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la pieza' });
  }
};

const eliminarPieza = async (req, res) => {
  try {
    await Pieza.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Pieza eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la pieza' });
  }
};

module.exports = { crearPieza, obtenerPiezas, obtenerPiezaPorId, actualizarPieza, eliminarPieza };