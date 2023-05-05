import { createSelector } from '@ngrx/store'
import { AppState } from '../AppState';
import { UfficialiState } from '../reducers/ufficiali.reducer';


export const ufficialiFeature = (state: AppState) => state.ufficiali;

export const selectUfficiali = createSelector(
  ufficialiFeature,
  (state: UfficialiState) => state.ufficiali
);