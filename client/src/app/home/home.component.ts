import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div>
      <h2>Maremma maiala</h2>
      <button mat-flat-button routerLink="/dashboard" color="primary">
        Vai alla dashboard
      </button>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
