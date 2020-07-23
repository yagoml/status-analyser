import mongoose from '../database'

const CompanyDataSchema = new mongoose.Schema({
  code: {type: String, unique: true, required: true},
  price: { type: Object },
  pl: { type: Number },
  pVp: { type: Number },
  roe: { type: Number },
  roa: { type: Number },
  roic: { type: Number },
  netMargin: { type: Number },
  dbPl: { type: Number },
  evEbit: { type: Number }
})

export default mongoose.model('CompanyData', CompanyDataSchema)