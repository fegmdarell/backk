import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import empresaRoutes from './routes/empresa.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://front-ootig5pgj-franks-projects-e016718d.vercel.app',
    'https://front-beige-six.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());
app.use('/api/empresa', empresaRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(process.env.PORT || 4000, () =>
      console.log(`🚀 Backend corriendo en http://localhost:${process.env.PORT || 4000}`)
    );
  })
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));
