import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingerRoutingModule } from './singer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestForChangeComponent } from './request-for-change/request-for-change.component';


@NgModule({
  declarations: [

  
    DashboardComponent,
        RequestForChangeComponent
  ],
  imports: [
    CommonModule,
    SingerRoutingModule
  ]
})
export class SingerModule { }
