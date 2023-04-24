import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  open: any;

  constructor(private snackbar: MatSnackBar) {
    this.open = snackbar.open
  }

  defaultSnackbar(
    message: string,
    theme: 'errore' | 'standard' = 'standard',
    duration: number = 3000
  ): number {
    this.snackbar.open(message, '', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: theme === 'errore' ? 'snackbar__error' : 'snackbar'
    })
    return duration
  }
}
