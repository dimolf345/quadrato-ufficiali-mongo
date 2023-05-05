import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/store/AppState';
import { IUfficiale } from 'src/app/shared/interfaces';
import { IMovimento } from 'src/app/shared/interfaces/movimento';
import { resettaFormECampi } from 'src/app/shared/utils/resettaFormECampi';
import * as fromMovimenti from '../../ngrx/store/actions/movimenti.actions'
import { checkFormattaImporto, formattaImporto } from 'src/app/shared/utils/pulisciImporto';
import { LoadingService } from 'src/app/core/loading.service';
import { Observable } from 'rxjs';
import { importoValidator } from 'src/app/shared/utils/importoValidator';


@Component({
  selector: 'app-aggiungi-movimento',
  templateUrl: './aggiungi-movimento.component.html',
  styleUrls: ['./aggiungi-movimento.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggiungiMovimentoComponent implements OnChanges, OnInit {
  error: string = ''
  loading$: Observable<boolean> = new Observable()
  maxDate: Date = new Date()


  @Input()
  ufficiali: IUfficiale[] = []

  public nuovoMovimentoForm = new FormGroup({
    creato_da: new FormControl('', Validators.required),
    data_movimento: new FormControl<Date>(new Date(), Validators.required),
    importo: new FormControl<string>('', [Validators.required, importoValidator()]),
    descrizione: new FormControl('', Validators.required),
    note: new FormControl('', Validators.minLength(8))
  })

  public tipoMovimento = new FormControl<'spesa' | 'incasso'>('spesa', [Validators.required])

  constructor(private store: Store<AppState>, private currencyPipe: CurrencyPipe, private loadingService: LoadingService) { }
  ngOnInit(): void {
    this.loading$ = this.store.select((state) => state.movimenti.aggiornaMovimenti)

    this.nuovoMovimentoForm.valueChanges.subscribe((form) => {
      if (form.importo && checkFormattaImporto(form.importo)) {
        this.nuovoMovimentoForm.patchValue({
          importo: this.currencyPipe.transform(formattaImporto(form.importo), 'EUR', 'symbol', '1.0-2')
        }, { emitEvent: false })
      }
    })
  }

  onSubmit() {
    const nuovoMovimento = {
      ...this.nuovoMovimentoForm.value,
      importo: this.calcolaImporto(this.nuovoMovimentoForm.controls.importo.value!)
    } as Partial<IMovimento>
    resettaFormECampi(this.nuovoMovimentoForm)
    this.store.dispatch(fromMovimenti.aggiungiMovimentoAPI(nuovoMovimento))
  }


  private calcolaImporto(stringaImporto: string): number {
    const stringaFiltrata = formattaImporto(stringaImporto)
    return this.tipoMovimento.value === 'spesa' ? -stringaFiltrata : +stringaFiltrata
  }


  ngOnChanges(changes: SimpleChanges): void {
  }

}

// this.nuovoMovimentoForm.valueChanges.subscribe((form) => {

//   if (form.importo) {
//     let importoFiltrato = form.importo!.replace(/€/g, '').replace(/^0\d/, '')
//     this.nuovoMovimentoForm.patchValue({
//       importo: this.currencyPipe.transform(importoFiltrato, 'EUR', 'symbol', '1.0-2')
//     }, { emitEvent: false })
//   }
// })