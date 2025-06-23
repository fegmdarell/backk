import express from 'express'
const router = express.Router()

// Endpoint básico para pruebas
router.post('/confirm', (req, res) => {
  const paymentData = req.body
  console.log("✅ Pago confirmado (simulado):", paymentData)
  res.status(200).json({ message: "Pago recibido con éxito en el backend" })
})

export default router