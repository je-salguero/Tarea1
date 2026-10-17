const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fncRegistrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    let user = await User.findOne({ correo });
    if (user) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      nombre,
      correo,
      password: hashedPassword,
      rol
    });

    await user.save();
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor al registrar' });
  }
};

const fncIniciarSesion = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const payload = {
      id: user._id,
      email: user.correo,
      role: user.rol
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '5m'
    });

    const usuario = {
      id: user._id,
      nombre: user.nombre,
      correo: user.correo,
      rol: user.rol,
      pedidos: user.pedidos,
      createdAt: user.createdAt
    };

    res.json({ token, usuario });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor al iniciar sesión' });
  }
};

module.exports = { fncRegistrarUsuario, fncIniciarSesion };
