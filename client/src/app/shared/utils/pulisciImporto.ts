// this.nuovoMovimentoForm.valueChanges.subscribe((form) => {

//   if (form.importo) {
//     let importoFiltrato = form.importo!.replace(/€/g, '').replace(/^0\d/, '')
//     this.nuovoMovimentoForm.patchValue({
//       importo: this.currencyPipe.transform(importoFiltrato, 'EUR', 'symbol', '1.0-2')
//     }, { emitEvent: false })
//   }
// })