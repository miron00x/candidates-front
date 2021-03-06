import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { AuthGuard } from './guard/auth.guard';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateInterviewComponent } from './create-interview/create-interview.component';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { StatisticComponent } from './statistic/statistic.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { DepartmentListComponent } from './department-list/department-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'create-employee', component: CreateEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'candidate-list', component: CandidateListComponent, canActivate: [AuthGuard] },
  { path: 'interview-list', component: InterviewListComponent, canActivate: [AuthGuard] },
  { path: 'departments-list', component: DepartmentListComponent, canActivate: [AuthGuard] },
  { path: 'create-candidate', component: CreateCandidateComponent, canActivate: [AuthGuard] },
  { path: 'create-interview', component: CreateInterviewComponent, canActivate: [AuthGuard] },
  { path: 'statistic', component: StatisticComponent, canActivate: [AuthGuard] },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
  { path: 'candidate-details/:id', component: CandidateDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
