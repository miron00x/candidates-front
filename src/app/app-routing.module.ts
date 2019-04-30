import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { AuthGuard } from './guard/auth.guard';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: 'create-employee', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'create-employee', component: CreateEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'candidate-list', component: CandidateListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
