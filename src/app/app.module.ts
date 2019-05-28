import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { BasicAuthInterceptor } from './interceptors/basic-auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { CandidateListComponent } from './candidate-list/candidate-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';

import { FlatpickrModule } from 'angularx-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { CreateInterviewComponent } from './create-interview/create-interview.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { EditInterviewComponent } from './edit-interview/edit-interview.component';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { StatisticComponent } from './statistic/statistic.component';
import { ChartsModule } from 'ng2-charts';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

import {FileUploadModule} from "ng2-file-upload";
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { EditCandidateComponent } from './edit-candidate/edit-candidate.component';
import { NgbdSortableHeader } from './util/sortable.directive';
import { DepartmentListComponent } from './department-list/department-list.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    EmployeeListComponent,
    CandidateListComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    CreateCandidateComponent,
    CreateInterviewComponent,
    EditInterviewComponent,
    InterviewListComponent,
    StatisticComponent,
    EmployeeDetailsComponent,
    CandidateDetailsComponent,
    EditCandidateComponent,
    NgbdSortableHeader,
    DepartmentListComponent,
    CreateDepartmentComponent
  ],
  imports: [
	  CommonModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
	  FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgSelectModule,
    ChartsModule,
    FileUploadModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue : '/' },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
