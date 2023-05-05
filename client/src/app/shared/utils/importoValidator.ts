import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { formattaImporto } from "./pulisciImporto";

export function importoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const importo = control.value

    if (+formattaImporto(importo) >= 0) return null
    else return {
      importoNonValido: true
    }
  }
}