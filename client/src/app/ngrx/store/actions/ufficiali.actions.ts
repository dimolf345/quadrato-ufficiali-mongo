import { createAction, props } from '@ngrx/store'
import { IUfficiale } from 'src/app/shared/interfaces'

export const caricaUfficiali = createAction('[Dashboard] Carica Ufficiali')
export const ufficialiCaricati = createAction('[Ufficiali API] Ufficiali Caricati', props<{ ufficiali: IUfficiale[] }>())
export const aggiungiUfficiale = createAction('[Dashboard] Aggiungi Ufficiale', props<{ ufficiale: IUfficiale }>())
