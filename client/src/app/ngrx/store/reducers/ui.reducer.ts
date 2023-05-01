import { createFeature, createReducer, on } from "@ngrx/store";

import * as fromUI from '../actions/ui.actions'

export interface UIState {
  errore: string
}

const initialState: UIState = {
  errore: ''
}

export const UIFeature = createFeature({
  name: 'ui',
  reducer: createReducer(
    initialState,
    on(fromUI.visualizzaErrore, (state, payload) => {
      if (state.errore !== '') {
        const nuovoErrore = payload.errore + '\n' + state.errore
        return {
          errore: nuovoErrore
        }
      }
      else return { errore: payload.errore }
    }),
    on(fromUI.resetErrore, () => ({
      errore: ''
    }))
  )
})