import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { MovimentiService } from 'src/app/core/api/movimenti.service';
import { IUfficiale } from 'src/app/shared/interfaces';
import { IMovimento } from 'src/app/shared/interfaces/movimento';

@Component({
  selector: 'app-aggiungi-movimento',
  templateUrl: './aggiungi-movimento.component.html',
  styleUrls: ['./aggiungi-movimento.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggiungiMovimentoComponent implements OnChanges, OnInit {
  error: string = ''

  @Input()
  ufficiali: IUfficiale[] = []

  public nuovoMovimentoForm = new FormGroup({
    creato_da: new FormControl('', Validators.required),
    data_movimento: new FormControl<Date>(new Date(), Validators.required),
    importo: new FormControl<string>('', [Validators.required]),
    descrizione: new FormControl('', Validators.required),
    note: new FormControl('', Validators.minLength(8))
  })

  constructor(private movimentiService: MovimentiService, private currencyPipe: CurrencyPipe) { }
  ngOnInit(): void {
  }

  onSubmit() {
    const nuovoMovimento = this.nuovoMovimentoForm.value as Partial<IMovimento>
    this.nuovoMovimentoForm.reset()
    this.movimentiService.aggiungiMovimento(nuovoMovimento).subscribe((res) => {
      console.log(res)
    })
  }




  ngOnChanges(changes: SimpleChanges): void {
  }

}
