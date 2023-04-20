import { createSelector } from '@ngrx/store'
import { AppState } from '../store/AppState';
import { UfficialiState } from '../store/reducers/ufficiali.reducer';


export const ufficialiFeature = (state: AppState) => state.ufficiali;

export const selectUfficiali = createSelector(
  ufficialiFeature,
  (state: UfficialiState) => state.ufficiali
);