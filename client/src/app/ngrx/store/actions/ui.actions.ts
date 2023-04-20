import { createAction, props } from "@ngrx/store";


export const visualizzaErrore = createAction('[UI] Visualizza Errore', props<{ error: string }>())