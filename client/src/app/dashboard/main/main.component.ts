import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUfficiale } from 'src/app/shared/interfaces';
import * as fromUfficiali from '../../ngrx/store/actions/ufficiali.actions'
import { selectUfficiali } from 'src/app/ngrx/selectors/ufficiali.selector';
import { AppState } from 'src/app/ngrx/store/AppState';

@Component({
  selector: 'app-main',
  template: `
    <div *ngIf="(ufficiali$ | async) as ufficiali" >
        <ul>
          <li *ngFor="let ufficiale of ufficiali">
            <p>
              {{ ufficiale.grado }} {{ ufficiale.nome }} {{ ufficiale.cognome }}
            </p>
          </li>
        </ul>
        <button routerLink="/" mat-flat-button color="primary">
          Vai alla home page
        </button>
      </div>
      <app-aggiungi-ufficiale ></app-aggiungi-ufficiale>
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  ufficiali$: Observable<IUfficiale[]> = new Observable();

  constructor(private store: Store<AppState>) {
    this.store.dispatch(fromUfficiali.caricaUfficiali())
  }

  ngOnInit(): void {
    this.ufficiali$ = this.store.select(selectUfficiali)
  }


}
