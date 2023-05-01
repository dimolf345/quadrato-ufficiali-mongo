import { createSelector } from "@ngrx/store";
import { AppState } from "../store/AppState";
import { FondoState } from "../store/reducers/fondo.reducer";

export const fondoFeature = (state: AppState) => state.fondo;


export const selectSaldoFondo = createSelector(
  fondoFeature,
  (state: FondoState) => state.fondo?.saldo
)

export const selectFondo = createSelector(
  fondoFeature,
  (state: FondoState) => state.fondo
)