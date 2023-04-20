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
    theme: 'error' | 'standar' = 'standar',
    duration: number = 3000
  ) {
    this.snackbar.open(message, '', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: theme === 'error' ? ['snackbar__error'] : []
    })
  }
}
