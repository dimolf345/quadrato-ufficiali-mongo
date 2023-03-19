import mongoose, { Schema } from 'mongoose'
import { Ufficiale } from '../types/ufficiale'
import gradi from '../../utils/gradi'

const ufficialeSchema = new Schema<Ufficiale>({
  nome: {
    type: String,
    required: [true, 'Inserire il nome dell\'ufficiale'],
    minlength: [3, 'Il nome deve contenere almeno 3 caratteri']
  },
  cognome: {
    type: String,
    required: [true, 'Inserire il cognome dell\'ufficiale'],
    minlength: [2, 'Il cognome deve contenere almeno 2 caratteri']
  },
  grado: {
    type: String,
    required: true,
    enum: [...gradi]
  },
  data_imbarco: {
    type: Date,
    required: [true, 'Data di imbarco mancante'],
    validate: {
      validator: controllaDataOdierna,
      message: () => 'La data di imbarco dev\'essere precedente alla data odierna'
    }
  },
  email: {
    type: String,
    required: [true, 'Inserire l\'indirizzo email istituzionale'],
    unique: true,
    immutable: true,
    validate: {
      validator: controllaEmailMarina,
      message: (props: any) => `${props.value} non è un valido indirizzo email istituzionale`
    }
  },
  ddq: {
    type: Boolean,
    default: false
  },
  pt: {
    type: String,
    validate: {
      validator: (pt: string) => /\d/.test(pt),
      message: (props: any) => `${props.value} non è un valido posto tabellare. Inserire solo numeri`
    }
  },
  temporaneo_imbarco: {
    type: Boolean,
    default: false
  },
  data_sbarco: {
    type: Date,
    validate: {
      validator: controllaDataOdierna,
      message: () => 'Inserire una data antecedente alla data odierna'
    }
  },
  attivo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

function controllaEmailMarina (email: string): boolean {
  const mailRegex = /\w*\.\w*@marina\.difesa\.it/
  return mailRegex.test(email)
}

function controllaDataOdierna (data: Date | string) {
  return data <= new Date()
}

export default mongoose.model('Ufficiale', ufficialeSchema, 'ufficiali')
