import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import empresaRoutes from './routes/empresa.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // cámbialo por el dominio real en producción
  credentials: true
}));

app.use(express.json());
app.use('/api/empresa', empresaRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(process.env.PORT || 4000, () =>
      console.log(`🚀 Backend corriendo en http://localhost:${process.env.PORT || 4000}`)
    );
  })
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));
