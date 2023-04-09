import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import gradi from 'src/app/shared/utils/gradi';

@Component({
  selector: 'app-aggiungi-ufficiale',
  templateUrl: './aggiungi-ufficiale.component.html',
  styleUrls: ['./aggiungi-ufficiale.component.scss']
})
export class AggiungiUfficialeComponent {
  public nuovoUfficialeForm = new FormGroup({
    grado: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    cognome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    pt: new FormControl<number>(0),
    data_imbarco: new FormControl<Date>(new Date(), Validators.required)
  })
  gradi = gradi;


  onSubmit() {
    console.log(this.nuovoUfficialeForm)
  }
}
