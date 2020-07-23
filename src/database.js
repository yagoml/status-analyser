import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/status-analyse', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.Promise = global.Promise

export default mongoose