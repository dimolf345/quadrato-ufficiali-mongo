import { Mongoose, Schema } from 'mongoose'
import { Movimento } from '../types/movimento'
const mongoose: Mongoose = require('mongoose')

const movimentoSchema: Schema = new mongoose.Schema<Movimento>({
  creato_da: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ufficiale',
    required: [true, "Inserire l'ufficiale responsabile del movimento!"]
  },
  data_creazione: {
    type: Date,
    required: [true, 'Inserire una data per la creazione del movimento'],
    default: new Date()
  },
  data_movimento: {
    type: Date,
    required: [true, 'Inserire la data di riferimento del movimento']
  },
  importo: {
    type: Number,
    required: [true, 'Importo del movimento mancante!']
  },
  descrizione: {
    type: String,
    required: [true, 'Inserire la descrizione del movimento']
  },
  note: {
    type: String
  }
})

export default mongoose.model<Movimento>('Movimento', movimentoSchema)
