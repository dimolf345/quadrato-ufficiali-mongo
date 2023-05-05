import { createSelector } from "@ngrx/store";
import { AppState } from "../AppState";
import { FondoState } from "../reducers/fondo.reducer";

export const fondoFeature = (state: AppState) => state.fondo;


export const selectSaldoFondo = createSelector(
  fondoFeature,
  (state: FondoState) => state.fondo?.saldo
)

export const selectFondo = createSelector(
  fondoFeature,
  (state: FondoState) => state.fondo
)