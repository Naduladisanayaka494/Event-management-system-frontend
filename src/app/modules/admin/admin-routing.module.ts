import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditTranactionComponent } from './edit-tranaction/edit-tranaction.component';
import { ReportComponent } from './report/report.component';
import { AddEventsComponent } from './add-events/add-events.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'edit-tranaction', component: EditTranactionComponent },
  { path: 'report', component: ReportComponent },
  { path: 'add-event', component: AddEventsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
