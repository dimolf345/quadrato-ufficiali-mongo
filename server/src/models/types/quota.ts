import { ObjectId } from 'mongoose'

export interface Quota {
  creato_da: ObjectId;
  data_creazione: Date;
  importo: number;
  descrizione: string;
  note?: string;
}
