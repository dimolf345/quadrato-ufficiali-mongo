import { ObjectId } from 'mongoose'

export type Quota = {
  creato_da: ObjectId;
  data_creazione: Date;
  importo: number;
  descrizione: string;
  note?: string;
}
