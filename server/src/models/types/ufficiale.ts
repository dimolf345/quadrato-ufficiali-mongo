import { Schema } from 'mongoose'
import gradi from '../../utils/gradi'

export type Ufficiale = {
  _id?: Schema.Types.ObjectId;
  nome: string;
  cognome: string;
  grado: typeof gradi[number]
  data_imbarco: Date;
  email: string;
  ddq: boolean;
  pt?: string;
  temporaneo_imbarco: boolean;
  data_sbarco: Date;
  attivo: boolean
}
