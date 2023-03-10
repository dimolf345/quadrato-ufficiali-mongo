import { Mongoose, Schema } from 'mongoose'

const mongoose: Mongoose = require('mongoose')

const fondoSchema = new Schema({
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

module.exports = fondoModel
