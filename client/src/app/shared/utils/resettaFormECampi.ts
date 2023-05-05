import { FormGroup } from "@angular/forms";

export function resettaFormECampi(form: FormGroup): void {
  form.reset()
  Object.keys(form.controls).forEach(key => {
    form.controls[key as keyof typeof form.controls].setErrors(null)
  });
}