import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IUfficiale } from 'src/app/shared/interfaces';
import gradi from 'src/app/shared/utils/gradi';
import { UfficialiService } from 'src/app/core/api/ufficiali.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/store/AppState';
import * as fromUfficiali from '../../ngrx/store/actions/ufficiali.actions'

@Component({
  selector: 'app-aggiungi-ufficiale',
  templateUrl: './aggiungi-ufficiale.component.html',
  styleUrls: ['./aggiungi-ufficiale.component.scss']
})
export class AggiungiUfficialeComponent {
  error: string = ''

  public nuovoUfficialeForm = new FormGroup({
    grado: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    cognome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    pt: new FormControl<number>(0),
    data_imbarco: new FormControl<Date>(new Date(), Validators.required)
  })
  gradi = gradi;

  constructor(private ufficialiService: UfficialiService, private store: Store<AppState>) { }


  onSubmit() {
    const nuovoUfficiale = this.nuovoUfficialeForm.value as IUfficiale
    this.nuovoUfficialeForm.reset()
    this.ufficialiService.aggiungiUfficiale(nuovoUfficiale).subscribe({
      next: (res) => this.store.dispatch(fromUfficiali.caricaUfficiali()),
      error: (error) => this.error = error
    })
  }
}
