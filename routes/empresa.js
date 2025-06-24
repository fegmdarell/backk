import express from 'express';
import bcrypt from 'bcryptjs';
import Empresa from '../models/Empresa.js';

const router = express.Router();

// 📝 Registro de empresa con cifrado de contraseña
router.post('/registrar', async (req, res) => {
  try {
    console.log('Datos recibidos en registro:', req.body); // 
    // Usa el spread para tomar todos los campos del body
    const datos = req.body;

    if (!datos.nombre || !datos.correo || !datos.password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const existe = await Empresa.findOne({ correo: datos.correo });
    if (existe) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(datos.password, salt);

    const nuevaEmpresa = new Empresa({
      ...datos,
      password: hashedPassword
    });
    await nuevaEmpresa.save();

    res.status(201).json({
      message: '✅ Empresa registrada correctamente',
      empresa: {
        _id: nuevaEmpresa._id,
        nombre: nuevaEmpresa.nombre,
        correo: nuevaEmpresa.correo
      }
    });
  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// 🔐 Inicio de sesión seguro
router.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body;
    const empresa = await Empresa.findOne({ correo });
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    // Comparar la contraseña cifrada
    const isMatch = await bcrypt.compare(password, empresa.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      message: '✅ Inicio de sesión exitoso',
      empresa: {
        _id: empresa._id,
        nombre: empresa.nombre,
        correo: empresa.correo
      }
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener empresa por ID
router.get('/:id', async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id);
    if (!empresa) return res.status(404).json({ msg: 'Empresa no encontrada' });
    res.json(empresa);
  } catch (err) {
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// Actualizar empresa por ID
router.put('/:id', async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empresa) return res.status(404).json({ msg: 'Empresa no encontrada' });
    res.json(empresa);
  } catch (err) {
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

export default router;
