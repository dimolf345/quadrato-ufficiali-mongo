
export interface IUfficiale {
  _id?: string;
  nome: string;
  cognome: string;
  grado: typeof gradi[number]
  data_imbarco: Date;
  email: string;
  ddq: boolean;
  pt?: string;
  temporaneo_imbarco: boolean;
  data_sbarco?: Date;
  attivo: boolean
}



const gradi = [
  'A.S',
  'A.D.',
  'CA',
  'C.V.',
  'C.F.',
  'C.C.',
  'T.V.',
  'S.T.V.',
  'GM',
  'ASP GM'
]
