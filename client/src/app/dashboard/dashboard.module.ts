import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../shared/material.module';
import { AggiungiUfficialeComponent } from './aggiungi-ufficiale/aggiungi-ufficiale.component';

@NgModule({
  declarations: [MainComponent, AggiungiUfficialeComponent],
  imports: [CommonModule, ReactiveFormsModule, DashboardRoutingModule, MaterialModule],
  exports: [MainComponent],
})
export class DashboardModule { }
