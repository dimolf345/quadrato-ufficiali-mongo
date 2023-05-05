import { createFeature, createReducer, on } from '@ngrx/store'
import { IUfficiale } from "src/app/shared/interfaces";
import * as fromUfficiali from '../actions/ufficiali.actions'

export interface UfficialiState {
  ufficiali: IUfficiale[],
  aggiornaUfficiali: boolean
}

const initialState: UfficialiState = {
  ufficiali: [],
  aggiornaUfficiali: false
}

export const ufficialiFeature = createFeature({
  name: 'ufficiali',
  reducer: createReducer(
    initialState,
    on(fromUfficiali.caricaUfficiali, (state) => ({
      ...state,
      aggiornaUfficiali: true
    })),
    on(fromUfficiali.ufficialiCaricati, (state, payload) => ({
      ufficiali: payload.ufficiali,
      aggiornaUfficiali: false
    })),
    on(fromUfficiali.ufficialeAggiuntoAPI, (state, action) => ({
      ufficiali: [...state.ufficiali, action.payload],
      aggiornaUfficiali: false
    }))
  )
})

