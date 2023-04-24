import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromUI from '../store/actions/ui.actions'
import { SnackbarService } from 'src/app/core/snackbar.service';
import { delay, map, of, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectErrore } from '../selectors/ui.selector';
import { AppState } from '../store/AppState';


@Injectable()
export class UIEffects {
  visualizzaSnackbar$ = createEffect(() => this.actions$.pipe(
    ofType<any>(fromUI.visualizzaErrore),
    withLatestFrom(this.store.select(selectErrore)),
    tap(([_, data]) => {
      this.snackbar.defaultSnackbar(data, 'errore')
    }),
    delay(5000),
    map(() => fromUI.resetErrore())
  ))



  constructor(private actions$: Actions, private snackbar: SnackbarService,
    private store: Store<AppState>
  ) { }
}
