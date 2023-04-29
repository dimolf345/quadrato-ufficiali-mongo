import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUfficiale } from 'src/app/shared/interfaces';
import * as fromUfficiali from '../../ngrx/store/actions/ufficiali.actions';
import * as fromFondo from '../../ngrx/store/actions/fondo.actions';
import { selectUfficiali } from 'src/app/ngrx/selectors/ufficiali.selector';
import { AppState } from 'src/app/ngrx/store/AppState';

@Component({
  selector: 'app-main',
  template: `

    <button routerLink="/" mat-flat-button color="primary">
      Vai alla home page
    </button>
    <app-aggiungi-ufficiale></app-aggiungi-ufficiale>
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  ufficiali$: Observable<IUfficiale[]> = new Observable();

  constructor(private store: Store<AppState>) {
    this.store.dispatch(fromUfficiali.caricaUfficiali());
    this.store.dispatch(fromFondo.caricaFondo())
  }

  ngOnInit(): void {
    this.ufficiali$ = this.store.select(selectUfficiali);
  }
}
