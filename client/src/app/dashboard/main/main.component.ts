import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUfficiale } from 'src/app/shared/interfaces';
import * as fromUfficiali from '../../ngrx/store/actions/ufficiali.actions';
import * as fromFondo from '../../ngrx/store/actions/fondo.actions';
import * as fromMovimenti from '../../ngrx/store/actions/movimenti.actions'
import { selectUfficiali } from 'src/app/ngrx/store/selectors/ufficiali.selector';
import { AppState } from 'src/app/ngrx/store/AppState';
import { IFondo } from 'src/app/shared/interfaces/fondo';
import { selectFondo } from 'src/app/ngrx/store/selectors/fondo.selector';

@Component({
  selector: 'app-main',
  template: `
   <ng-container *ngIf="(fondo$ | async) as fondo">
    <app-dettaglio-fondo [saldo]="fondo.saldo"></app-dettaglio-fondo>
    <app-aggiungi-ufficiale></app-aggiungi-ufficiale>
    </ng-container>
    <button routerLink="/" mat-flat-button color="primary">
      Vai alla home page
    </button>
    <!-- <app-aggiungi-movimento [ufficiali]="(ufficiali$ | async) || []"></app-aggiungi-movimento> -->
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  ufficiali$: Observable<IUfficiale[]> = new Observable();
  fondo$: Observable<IFondo | null> = new Observable();

  constructor(private store: Store<AppState>) {
    this.store.dispatch(fromUfficiali.caricaUfficiali());
    this.store.dispatch(fromFondo.caricaFondo())
    this.store.dispatch(fromMovimenti.caricaMovimenti())
  }

  ngOnInit(): void {
    this.ufficiali$ = this.store.select(selectUfficiali);
    this.fondo$ = this.store.select(selectFondo)
  }
}
