import { ObjectId } from 'mongoose'

export interface IFondo {
  _id?: ObjectId;
  saldo: number;
  ultimi_movimenti: ObjectId[]
  aggiornaSaldoEMovimenti: (nuovoImporto: number, movimentoId: ObjectId) => Promise<number>
}
