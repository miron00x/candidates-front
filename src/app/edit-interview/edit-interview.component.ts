import { Component, OnInit, Input } from '@angular/core';
import { Interview } from '../domain/interview';
import { Employee } from '../domain/employee';
import { Observable, Subject, concat, of } from 'rxjs';
import { Candidate } from '../domain/candidate';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { CandidateService } from '../services/candidate.service';
import { InterviewService } from '../services/interview.service';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-interview',
  templateUrl: './edit-interview.component.html',
  styleUrls: ['./edit-interview.component.css']
})
export class EditInterviewComponent implements OnInit {

  @Input() interview: Interview;
	message = '';
  error = '';
  loading = false;
  submitted = false;
  selectedEmployee: Employee;

  employees: Observable<Employee[]>;
  employeeLoading = false;
  employeesinput$ = new Subject<string>();

  selectedEmployees: Employee[] = <any>[];
  selectedCandidate: Candidate;

  candidates: Candidate[];
  date: Date;
	
	constructor(
		private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private candidateService: CandidateService,
    private interviewService: InterviewService
  ) { }

	ngOnInit() {
    //this.selectedEmployees = this.interview.employees;
    this.selectedCandidate = this.interview.candidate;
    this.date = this.interview.interviewDateTime;
    this.fillCandidates();
    this.loadEmployees();
  }

  private loadEmployees() {
    this.employees = concat(
        of([]), // default items
        this.employeesinput$.pipe(
           debounceTime(200),
           distinctUntilChanged(),
           tap(() => this.employeeLoading = true),
           switchMap(term => this.employeeService.getEmployeeList().pipe(
               catchError(() => of([])), // empty list on error
               tap(() => this.employeeLoading = false)
           )) 
        )
    );
  }
  
  fillCandidates(){
    this.candidateService.getAll()
      .subscribe(data => this.candidates=data, error => this.setError(error));
  }

	onSubmit() {
    this.submitted = true;
     
    this.loading = true;
    this.interview.candidate = this.selectedCandidate;
    this.interview.interviewDateTime = this.date;
    this.interviewService.update(this.interview)
      .subscribe(data => this.setMessage(data), 
        error => this.setError(error), 
        () => {
          this.loading = false;
          this.setMessage("OK Ok kO KO");
        }
      );

  }
	
	setMessage(message: string): void {
		this.error = ``;
		this.message = `Message: ${message}`;
	}	
	
	setError(error: string): void {
		this.message = ``;
		this.error = `Error: ${error}`;
	}	
}
