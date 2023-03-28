import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
  exports: [MainComponent],
})
export class DashboardModule {}
