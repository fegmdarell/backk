import express from 'express'
import paypal from '@paypal/checkout-server-sdk'
import nodemailer from 'nodemailer'

const router = express.Router()

// Configuración del entorno PayPal
const environment = new paypal.core.SandboxEnvironment(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
const client = new paypal.core.PayPalHttpClient(environment)

// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Endpoint para confirmar pagos reales
router.post('/confirm', async (req, res) => {
  const { orderId, email } = req.body

  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderId)
    request.requestBody({})
    const response = await client.execute(request)

    // Enviar correo de confirmación
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Confirmación de Pago',
      text: `Tu pago con ID ${orderId} fue confirmado exitosamente.`,
    })

    console.log('✅ Pago confirmado:', response.result)
    res.status(200).json({ message: 'Pago confirmado y correo enviado', details: response.result })
  } catch (error) {
    console.error('❌ Error en el pago:', error)
    res.status(500).json({ message: 'Error en el procesamiento del pago' })
  }
})

export default router