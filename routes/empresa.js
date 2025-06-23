import express from 'express'
import Empresa from '../models/Empresa.js'

const router = express.Router()

// 📝 Registro de empresa
router.post('/registrar', async (req, res) => {
  try {
    const { nombre, correo, password } = req.body

    if (!nombre || !correo || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const existe = await Empresa.findOne({ correo })
    if (existe) {
      return res.status(409).json({ message: 'El correo ya está registrado' })
    }

    const nuevaEmpresa = new Empresa({ nombre, correo, password })
    await nuevaEmpresa.save()

    res.status(201).json({
      message: '✅ Empresa registrada correctamente',
      empresa: {
        id: nuevaEmpresa._id,
        nombre: nuevaEmpresa.nombre,
        correo: nuevaEmpresa.correo
      }
    })
  } catch (error) {
    console.error('❌ Error en registro:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// 🔐 Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body

    const empresa = await Empresa.findOne({ correo })
    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' })
    }

    if (empresa.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    res.status(200).json({
      message: '✅ Inicio de sesión exitoso',
      empresa: {
        id: empresa._id,
        nombre: empresa.nombre,
        correo: empresa.correo
      }
    })
  } catch (error) {
    console.error('❌ Error en login:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

export default router
