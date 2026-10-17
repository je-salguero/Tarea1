const Pieza = require('../models/Pieza');

const fncCrearPieza = async (req, res) => {
  try {
    const pieza = new Pieza(req.body);
    await pieza.save();
    res.status(201).json(pieza);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la pieza' });
  }
};

const fncObtenerPiezas = async (req, res) => {
  try {
    const piezas = await Pieza.find(req.query);
    res.json(piezas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el catálogo' });
  }
};

const fncObtenerPiezaPorId = async (req, res) => {
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

const fncActualizarPieza = async (req, res) => {
  try {
    const pieza = await Pieza.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });

    if (!pieza) {
      return res.status(404).json({ mensaje: 'Pieza no encontrada' });
    }
    res.json(pieza);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la pieza' });
  }
};

const fncEliminarPieza = async (req, res) => {
  try {
    const pieza = await Pieza.findByIdAndDelete(req.params.id);
    if (!pieza) {
      return res.status(404).json({ mensaje: 'Pieza no encontrada' });
    }
    res.json({ mensaje: 'Pieza eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la pieza' });
  }
};

module.exports = {
  fncCrearPieza,
  fncObtenerPiezas,
  fncObtenerPiezaPorId,
  fncActualizarPieza,
  fncEliminarPieza
};
