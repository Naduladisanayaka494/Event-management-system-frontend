import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestForChangeComponent } from './request-for-change/request-for-change.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reuquest-change', component: RequestForChangeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingerRoutingModule { }
