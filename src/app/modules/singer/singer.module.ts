import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingerRoutingModule } from './singer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestForChangeComponent } from './request-for-change/request-for-change.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, RequestForChangeComponent],
  imports: [CommonModule, SingerRoutingModule, ReactiveFormsModule],
})
export class SingerModule {}
