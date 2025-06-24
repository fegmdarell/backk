import mongoose from 'mongoose'

const EmpresaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  nit: { type: String, default: '' },
  correo: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  telefono: { type: String, default: '' },
  ciudad: { type: String, default: '' },
  departamento: { type: String, default: '' },
  direccion: { type: String, default: '' },
  sector: { type: String, default: '' },
  tamano: { type: String, default: '' },
  intereses: { type: String, default: '' },
  contacto: { type: String, default: '' },
  descripcion: { type: String, default: '' },
  ubicacion: { type: String, default: '' },
  logo: { type: String, default: '' }
}, {
  timestamps: true
});

const Empresa = mongoose.model('Empresa', EmpresaSchema)
export default Empresa
