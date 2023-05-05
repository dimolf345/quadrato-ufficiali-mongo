import { createAction, props } from '@ngrx/store'
import { IUfficiale } from 'src/app/shared/interfaces'

export const caricaUfficiali = createAction('[Dashboard] Carica Ufficiali')
export const ufficialiCaricati = createAction('[Ufficiali API] Ufficiali Caricati', props<{ ufficiali: IUfficiale[] }>())
export const aggiungiUfficialeAPI = createAction('[Ufficiali API] Aggiungi Ufficiale API', props<{ payload: IUfficiale }>())
export const ufficialeAggiuntoAPI = createAction('[Ufficiali API] Ufficiale aggiunto API', props<{ payload: IUfficiale }>())
