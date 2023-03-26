import mongoose, { Schema } from 'mongoose'
import { IFondo } from '../types/fondo'

const fondoSchema = new Schema<IFondo>({
  saldo: {
    type: Number,
    required: true
  },
  ultimi_movimenti: {
    type: [Schema.Types.ObjectId],
    ref: 'Movimento',
    default: []
  }
}, {
  timestamps: true
})

fondoSchema.methods.aggiornaSaldoEMovimenti = async function (nuovoImporto: number, movimentoId: Schema.Types.ObjectId) {
  this.saldo += nuovoImporto
  this.saldo = Number.parseFloat(this.saldo.toFixed(2))
  if (this.ultimi_movimenti.includes(movimentoId)) {
    await this.save()
    return this.saldo
  }
  if (this.ultimi_movimenti.length < 10) {
    this.ultimi_movimenti.push(movimentoId)
  } else {
    this.ultimi_movimenti.shift()
    this.ultimi_movimenti.push(movimentoId)
  }
  await this.save()

  return this.saldo
}

export default mongoose.model('Fondo', fondoSchema, 'fondo')
