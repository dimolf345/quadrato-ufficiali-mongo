import { Mongoose, Schema } from 'mongoose'
import { Fondo } from '../types/fondo'

const mongoose: Mongoose = require('mongoose')

const fondoSchema = new Schema<Fondo>({
  saldo: {
    type: Number,
    required: true
  },
  ultima_modifica: {
    type: Date
  },
  ultimi_movimenti: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Movimento'
  }
})

const fondoModel = mongoose.model('Fondo', fondoSchema)

export default fondoModel
