import { createFeature, createReducer, on } from "@ngrx/store";
import { IMovimento } from "src/app/shared/interfaces/movimento";
import * as fromMovimenti from '../actions/movimenti.actions'


export interface MovimentiState {
  movimenti: IMovimento[]
  aggiornaMovimenti: boolean
}

const initialState: MovimentiState = {
  movimenti: [],
  aggiornaMovimenti: false
}

export const movimentiFeature = createFeature({
  name: 'movimenti',
  reducer: createReducer(
    initialState,
    on(fromMovimenti.caricaMovimenti || fromMovimenti.movimentoAggiuntoAPI, (state) => ({
      movimenti: state.movimenti,
      aggiornaMovimenti: true
    })),
    on(fromMovimenti.movimentiCaricatiAPI, (_, action) => ({
      movimenti: action.payload,
      aggiornaMovimenti: false
    }))
  )
})