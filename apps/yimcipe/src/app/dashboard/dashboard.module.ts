import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent],
  imports: [CommonModule, DashboardRoutingModule, RouterModule, SharedModule],
})
export class DashboardModule {}
