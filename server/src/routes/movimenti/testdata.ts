import { Movimento } from '../../models/types/movimento'

export const movimentoSenzaErrori: Partial<Movimento> = {
  data_movimento: new Date('2023-01-01'),
  importo: 30.00,
  descrizione: 'movimento test'
}

export const listaMovimenti: Array<Partial<Movimento>> = [
  {
    data_movimento: new Date('2023-01-01'),
    importo: 10.00,
    descrizione: 'Acquisto 1'
  }, {
    data_movimento: new Date('2023-01-01'),
    importo: 20.00,
    descrizione: 'Acquisto 2'
  }, {
    data_movimento: new Date('2023-01-01'),
    importo: 30.00,
    descrizione: 'Acquisto 3'
  }
]
