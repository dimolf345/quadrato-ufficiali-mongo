import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { CustomDateAdapter } from './utils/customDateAdapter';
import { MatSnackBarModule } from '@angular/material/snack-bar'


@NgModule({
  declarations: [],
  imports: [MatNativeDateModule],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'it-IT',
    }, {
      provide: DateAdapter,
      useClass: CustomDateAdapter
    }
  ],
  exports: [MatToolbarModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSnackBarModule],
})
export class MaterialModule { }
