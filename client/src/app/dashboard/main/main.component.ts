import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UfficialiService } from 'src/app/core/api/ufficiali.service';
import { IUfficiale } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-main',
  template: `
    <div>
      <ul>
        <li *ngFor="let ufficiale of ufficiali$ | async">
          <p>
            {{ ufficiale.grado }} {{ ufficiale.nome }} {{ ufficiale.cognome }}
          </p>
        </li>
      </ul>
      <app-aggiungi-ufficiale></app-aggiungi-ufficiale>
      <button routerLink="/" mat-flat-button color="primary">
        Vai alla home page
      </button>
    </div>
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  ufficiali$: Observable<IUfficiale[]> = new Observable();

  constructor(private ufficialiService: UfficialiService) { }

  ngOnInit(): void {
    this.ufficiali$ = this.ufficialiService.caricaUfficiali()
  }
}
