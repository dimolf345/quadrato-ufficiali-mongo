import { ObjectId } from 'mongoose'

export type Fondo = {
  id?: ObjectId;
  saldo: number;
  ultima_modifica: Date
  ultimi_movimenti: [ObjectId]
}
