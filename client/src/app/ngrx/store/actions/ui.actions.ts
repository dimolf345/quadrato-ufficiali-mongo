import { createAction, props } from "@ngrx/store";


export const visualizzaErrore = createAction('[UI] Visualizza Errore', props<{ errore: string }>())

export const resetErrore = createAction('[UI] Reset Errore')