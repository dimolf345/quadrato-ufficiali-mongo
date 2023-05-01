import { createFeature, createReducer, on } from "@ngrx/store";
import { IFondo } from "src/app/shared/interfaces/fondo";
import * as fromFondo from '../actions/fondo.actions'


export interface FondoState {
  fondo: IFondo | null,
  aggiornaFondo: boolean
}

const initialState: FondoState = {
  fondo: null,
  aggiornaFondo: false
}

export const fondoFeature = createFeature({
  name: 'fondo',
  reducer: createReducer(
    initialState,
    on(fromFondo.caricaFondo, (state) => ({
      fondo: state.fondo,
      aggiornaFondo: true
    })),
    on(fromFondo.fondoCaricato, (_, action) => ({
      fondo: action.payload,
      aggiornaFondo: false
    }))
  )
})