import { createAction, props } from "@ngrx/store";
import { IFondo } from "src/app/shared/interfaces/fondo";


export const caricaFondo = createAction('[Dashboard] Carica Fondo')
export const fondoCaricato = createAction('[Fondo API] Fondo Caricato', props<{ payload: IFondo }>())

