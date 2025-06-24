import mongoose from 'mongoose'

const EmpresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  correo: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  descripcion: { type: String, default: '' },
  sector: { type: String, default: '' },
  ubicacion: { type: String, default: '' },
  telefono: { type: String, default: '' },
  logo: { type: String, default: '' },
  ciudad: { type: String, default: '' },
  tamano: { type: String, default: '' },
  intereses: { type: String, default: '' }
}, {
  timestamps: true
});

const Empresa = mongoose.model('Empresa', EmpresaSchema)
export default Empresa
