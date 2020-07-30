import mongoose from '../database'

const StockSchema = new mongoose.Schema({
  code: {type: String, unique: true, required: true},
  price: { type: Object },
  pl: { type: Number },
  pVp: { type: Number },
  roe: { type: Number },
  roa: { type: Number },
  lpa: { type: Number },
  roic: { type: Number },
  netMargin: { type: Number },
  dlPl: { type: Number },
  evEbit: { type: Number },
  cagrRevenue: { type: Number },
  cagrProfits: { type: Number },
  dlEbit: { type: Number },
  dailyLiquidity: { type: Number },
  currentLiquidity: { type: Number }
})

export default mongoose.model('Stock', StockSchema)