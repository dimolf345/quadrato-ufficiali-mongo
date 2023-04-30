import { IUfficiale } from "./ufficiale";

export interface IMovimento {
  _id: string;
  creato_da: IUfficiale
  data_crezione: Date;
  data_movimento: Date
  importo: number;
  descrizione: string;
  note?: string;
}