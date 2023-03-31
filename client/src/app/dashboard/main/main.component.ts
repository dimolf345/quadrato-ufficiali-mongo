import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-main',
  template: `
    <div>
      <ul>
        <li *ngFor="let ufficiale of ufficiali$ | async">
          <p>
            {{ ufficiale.grado }} + {{ ufficiale.nome }} +
            {{ ufficiale.cognome }}
          </p>
        </li>
      </ul>
      <button routerLink="/" mat-flat-button color="primary">
        Vai alla home page
      </button>
    </div>
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  ufficiali$: Observable<any> = new Observable();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.ufficiali$ = this.api.getOfficer();
  }
}
