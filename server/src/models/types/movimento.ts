import { ObjectId } from 'mongoose'

export interface Movimento {
  _id?: ObjectId
  creato_da: ObjectId;
  data_creazione: Date;
  data_movimento: Date;
  importo: number;
  descrizione: string;
  note?: string;
}
