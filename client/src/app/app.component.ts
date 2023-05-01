import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main class="main">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('className') appClass: string = 'app';
}
