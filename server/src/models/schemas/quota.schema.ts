import { Mongoose, Schema } from 'mongoose'

const mongoose: Mongoose = require('mongoose')

const quotaSchema = new Schema({
  creato_da: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ufficiale',
    required: [true, "La quota deve specificare l'ufficiale"]
  },
  data_creazione: {
    type: Date,
    required: [true, 'Specificare la data di creazione della quota'],
    default: new Date()
  },
  importo: {
    type: Number,
    required: [true, 'Importo della quota mancante!']
  },
  descrizione: {
    type: String,
    required: [true, 'Specificare la motivazione della quota']
  },
  note: String
})

const quotaModel = mongoose.model('Quota', quotaSchema)

module.exports = quotaModel
