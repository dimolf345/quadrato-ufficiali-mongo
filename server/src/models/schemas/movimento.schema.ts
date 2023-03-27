import { Schema, model } from 'mongoose'
import { Movimento } from '../types/movimento'

const movimentoSchema: Schema = new Schema<Movimento>({
  creato_da: {
    type: Schema.Types.ObjectId,
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
    required: [true, 'Inserire la data di riferimento del movimento'],
    validate: {
      validator: controllaDataOdierna,
      message: () => 'Inserire una data antecedente alla data odierna'
    }
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

function controllaDataOdierna (data: Date | string) {
  return data <= new Date()
}

export default model<Movimento>('Movimento', movimentoSchema, 'movimenti')
