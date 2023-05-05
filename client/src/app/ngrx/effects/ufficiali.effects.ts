import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as fromUfficiali from '../store/actions/ufficiali.actions'
import { UfficialiService } from 'src/app/core/api/ufficiali.service'
import { map, concatMap, switchMap, of, } from 'rxjs'
import { IUfficiale } from 'src/app/shared/interfaces'
import * as fromUI from '../store/actions/ui.actions'

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
    ofType(fromUfficiali.aggiungiUfficialeAPI),
    switchMap((action) => this.ufficialiService.aggiungiUfficiale(action.payload).pipe(
      concatMap((response: IUfficiale) => of(
        fromUfficiali.ufficialeAggiuntoAPI({ payload: response }),
        fromUI.visualizzaErrore({ errore: 'Ufficiale aggiunto con successo' })

      ))
    ))
  ))

  constructor(
    private actions$: Actions,
    private ufficialiService: UfficialiService
  ) { }
}
