import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <div>
      <button routerLink="/" mat-flat-button color="primary">
        Vai alla home page
      </button>
    </div>
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {}
