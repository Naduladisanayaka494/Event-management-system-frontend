import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingerRoutingModule } from './singer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestForChangeComponent } from './request-for-change/request-for-change.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [DashboardComponent, RequestForChangeComponent],
  imports: [
    CommonModule,
    SingerRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
})
export class SingerModule {}
