import { createSelector } from "@ngrx/store";
import { AppState } from "../store/AppState";
import { UIState } from "../store/reducers/ui.reducer";


export const UIFeature = (state: AppState) => state.ui

export const selectErrore = createSelector(
  UIFeature,
  (state: UIState) => state.errore
)