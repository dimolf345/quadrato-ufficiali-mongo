import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LoadingButtonComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  exports: [
    MatProgressSpinnerModule,
    LoadingButtonComponent
  ]
})
export class SharedModule { }
