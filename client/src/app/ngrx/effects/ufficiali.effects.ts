import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as fromUfficiali from '../store/actions/ufficiali.actions'
import { UfficialiService } from 'src/app/core/api/ufficiali.service'
import { map, concatMap, catchError, switchMap, tap, fromEvent } from 'rxjs'

@Injectable()
export class UfficialiEffects {
  caricaUfficiali$ = createEffect(() => this.actions$.pipe(
    ofType(fromUfficiali.caricaUfficiali),
    concatMap(() => this.ufficialiService.caricaUfficiali().pipe(
      map((res) => {
        return fromUfficiali.ufficialiCaricati({
          ufficiali: res
        })
      })
    ))
  ))

  aggiungiUfficiale = createEffect(() => this.actions$.pipe(
    ofType(fromUfficiali.aggiungiUfficiale),
    switchMap((action) => this.ufficialiService.aggiungiUfficiale(action.ufficiale).pipe(
      map((res) => {
        return fromUfficiali.caricaUfficiali()
      })
    ))
  ))

  constructor(
    private actions$: Actions,
    private ufficialiService: UfficialiService
  ) { }
}
