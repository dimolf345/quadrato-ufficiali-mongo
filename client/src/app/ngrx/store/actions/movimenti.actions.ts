import { createAction, props } from "@ngrx/store";
import { IMovimento } from "src/app/shared/interfaces/movimento";

export const caricaMovimenti = createAction('[Dashboard] Carica Movimenti')

export const movimentiCaricatiAPI = createAction('[Movimenti API] Movimenti Caricati', props<{ payload: IMovimento[] }>())
export const aggiungiMovimentoAPI = createAction('[Movimenti API] Aggiungi movimento API', props<Partial<IMovimento>>())

export const movimentoAggiuntoAPI = createAction('[Dashboard API] Movimento aggiunto API')