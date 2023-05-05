import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../shared/material.module';
import { AggiungiUfficialeComponent } from './aggiungi-ufficiale/aggiungi-ufficiale.component';
import { TabellaUfficialiComponent } from './tabella-ufficiali/tabella-ufficiali.component';
import { DettaglioFondoComponent } from './dettaglio-fondo/dettaglio-fondo.component';
import { AggiungiMovimentoComponent } from './aggiungi-movimento/aggiungi-movimento.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [MainComponent, AggiungiUfficialeComponent, TabellaUfficialiComponent, DettaglioFondoComponent, AggiungiMovimentoComponent],
  exports: [MainComponent],
  imports: [CommonModule, ReactiveFormsModule, DashboardRoutingModule, MaterialModule, SharedModule]
})
export class DashboardModule { }
