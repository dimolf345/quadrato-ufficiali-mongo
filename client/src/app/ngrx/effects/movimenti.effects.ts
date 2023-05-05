import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as fromMovimenti from '../store/actions/movimenti.actions'
import * as fromFondo from '../store/actions/fondo.actions'
import { MovimentiService } from 'src/app/core/api/movimenti.service'
import { concatMap, map, of, switchMap } from 'rxjs'



@Injectable()
export class MovimentiEffects {
  caricaMovimenti$ = createEffect(() => this.actions$.pipe(
    ofType(fromMovimenti.caricaMovimenti, fromMovimenti.movimentoAggiuntoAPI),
    concatMap(() => this.movimentiService.caricaMovimenti().pipe(
      map((res) => fromMovimenti.movimentiCaricatiAPI({
        payload: res
      }))
    ))
  ))

  aggiungiMovimento$ = createEffect(() => this.actions$.pipe(
    ofType(fromMovimenti.aggiungiMovimentoAPI),
    concatMap((payload) => this.movimentiService.aggiungiMovimento(payload).pipe(
      switchMap((_) => of(
        fromMovimenti.movimentoAggiuntoAPI(),
        fromFondo.caricaFondo()
      ))
    ))
  ))


  constructor(
    private actions$: Actions,
    private movimentiService: MovimentiService
  ) { }
}