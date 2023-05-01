import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as fromFondo from '../store/actions/fondo.actions'
import { FondoService } from 'src/app/core/api/fondo.service'
import { concatMap, map } from 'rxjs'


@Injectable()
export class fondoEffects {
  caricaFondo$ = createEffect(() => this.actions$.pipe(
    ofType(fromFondo.caricaFondo),
    concatMap(() => this.fondoService.caricaFondo().pipe(
      map((res) => fromFondo.fondoCaricato({
        payload: res
      }))
    ))
  ))

  constructor(
    private actions$: Actions,
    private fondoService: FondoService
  ) { }

}