import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dettaglio-fondo',
  template: ` <h3>Saldo attuale del fondo: {{saldo | currency: 'EUR'}}</h3> `,
  styleUrls: ['./dettaglio-fondo.component.scss'],
})
export class DettaglioFondoComponent {
  @Input()
  saldo: number = 0;
}
