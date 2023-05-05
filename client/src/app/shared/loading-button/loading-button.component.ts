import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-button',
  template: `
    <button [disabled]="disabled" type="submit" color="primary" mat-flat-button>
      <ng-template [ngIf]="(loadingObservable$ | async)">
        <mat-spinner diameter="24" color="accent"></mat-spinner>
      </ng-template>
      <ng-template [ngIf]="!(loadingObservable$ | async)">
        <span> {{ text }}</span>
      </ng-template>
    </button>
  `,
  styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent {
  @Input('loading')
  loadingObservable$: Observable<boolean> = new Observable();

  @Input('disabled')
  disabled: boolean = false

  @Input()
  text: string = '';

  contructor() { }
}
