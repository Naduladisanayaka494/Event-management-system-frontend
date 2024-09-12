import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEventsComponent } from './add-events/add-events.component';
import { ReportComponent } from './report/report.component';
import { EditTranactionComponent } from './edit-tranaction/edit-tranaction.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddEventsComponent,
    ReportComponent,
    EditTranactionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
