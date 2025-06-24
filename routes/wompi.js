import express from 'express';
import axios from 'axios';
import Empresa from '../models/Empresa.js';

const router = express.Router();

// Confirmar pago de Wompi y actualizar el plan de la empresa
router.post('/confirmar', async (req, res) => {
  const { transactionId, correo, plan } = req.body;

  if (!transactionId || !correo || !plan) {
    return res.status(400).json({ message: 'Faltan datos para confirmar el pago' });
  }

  try {
    // Consulta la transacción en la API de Wompi (sandbox)
    const response = await axios.get(`https://sandbox.wompi.co/v1/transactions/${transactionId}`);
    const data = response.data.data;

    if (data.status === 'APPROVED') {
      // Actualiza el plan de la empresa
      const empresa = await Empresa.findOneAndUpdate(
        { correo },
        { plan },
        { new: true }
      );
      if (!empresa) {
        return res.status(404).json({ message: 'Empresa no encontrada' });
      }
      return res.json({ message: 'Pago aprobado y plan actualizado', empresa });
    } else {
      return res.status(400).json({ message: 'El pago no fue aprobado', status: data.status });
    }
  } catch (error) {
    console.error('❌ Error confirmando pago Wompi:', error);
    res.status(500).json({ message: 'Error confirmando el pago con Wompi' });
  }
});

export default router;