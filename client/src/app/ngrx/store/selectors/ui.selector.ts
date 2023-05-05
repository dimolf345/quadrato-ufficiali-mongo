import { createSelector } from "@ngrx/store";
import { AppState } from "../AppState";
import { UIState } from "../reducers/ui.reducer";


export const UIFeature = (state: AppState) => state.ui

export const selectErrore = createSelector(
  UIFeature,
  (state: UIState) => state.errore
)