import { Component, OnInit } from '@angular/core';
import { Interview } from '../domain/interview';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Candidate } from '../domain/candidate';
import { InterviewService } from '../services/interview.service';
import { CandidateService } from '../services/candidate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Department } from '../domain/department';
import { Observable, Subject, concat, of } from 'rxjs';
import { Employee } from '../domain/employee';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.css']
})
export class CreateInterviewComponent implements OnInit {

  interview: Interview  = new Interview();
	message = '';
  error = '';
  loading = false;
  submitted = false;
  selectedEmployee: Employee;

  employees: Observable<Employee[]>;
  employeeLoading = false;
  employeesinput$ = new Subject<string>();

  selectedEmployees: number[];
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
    console.log(this.interview);
    this.interviewService.createInterview(this.interview, this.selectedEmployees)
      .subscribe(data => this.setMessage(data), 
        error => this.setError(error), 
        () => {
           this.setMessage("OK");
           this.loading = false;
        }
      );
    

    /*this.loading = true;
    this.employee.firstName = this.form.firstName.value;
    this.employee.lastName = this.form.lastName.value;
    this.employee.department = this.selectedDepartment;
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => this.setMessage(data), error => this.setError(error), () => this.router.navigate(['/employee-list']));
  */
  }
	
	setMessage(message: string): void {
		this.error = ``;
		this.message = `Success: ${message}`;
	}	
	
	setError(error: string): void {
		this.message = ``;
		this.error = `Error: ${error}`;
	}	

}
