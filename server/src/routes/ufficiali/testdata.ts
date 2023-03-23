import { Ufficiale } from '../../models/types/ufficiale'

export const ufficialeSenzaErrori: Partial<Ufficiale> = {
  nome: 'Test',
  cognome: 'Ufficiale',
  email: 'test.ufficiale@marina.difesa.it',
  grado: 'S.T.V.',
  data_imbarco: new Date('2022-01-01')
}

export const ufficialeConErrori: Partial<Ufficiale> = {
  nome: 'Test',
  cognome: 'Ufficiale',
  email: 'email.errata@gmail.com',
  grado: 'Babbuino',
  data_imbarco: new Date('2022-01-01')
}

export const ufficialiTest: Array<Partial<Ufficiale>> = [
  {
    nome: 'Mario',
    cognome: 'Rossi',
    email: 'mario.rossi@marina.difesa.it',
    grado: 'S.T.V.',
    data_imbarco: new Date('2020-01-01')
  },
  {
    nome: 'Emilio',
    cognome: 'Bianchi',
    email: 'giulio.bianchi@marina.difesa.it',
    grado: 'T.V.',
    data_imbarco: new Date('2020-01-01')
  },
  {
    nome: 'Carlo',
    cognome: 'Margottini',
    email: 'carlo.margottini@marina.difesa.it',
    grado: 'C.F.',
    data_imbarco: new Date('2020-01-01')
  },
  {
    nome: 'Luigi',
    cognome: 'Rizzo',
    email: 'luigi.rizzo@marina.difesa.it',
    grado: 'A.D.',
    data_imbarco: new Date('2020-01-01'),
    ddq: true
  }
]
