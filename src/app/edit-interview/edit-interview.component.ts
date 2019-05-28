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

  employees: Observable<Employee[]>;

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
    if(this.interview.employees){
      this.selectedEmployees = this.interview.employees.map((employee) => {
        return employee.id;
      });
    }
    this.selectedCandidate = this.interview.candidate;
    this.date = this.interview.interviewDateTime;
    this.fillCandidates();
    this.fillEmployees();
  }
  
  fillEmployees(){
    this.employeeService.getEmployeeList()
      .subscribe(data => this.employees=data, error => this.setError(error));
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
    console.log(this.interview.id);
    if(!this.interview.id){
      console.log("CREATE");
      this.interviewService.createInterview(this.interview, this.selectedEmployees)
      .subscribe(data => this.setMessage(data), 
        error => this.setError(error), 
        () => {
          this.loading = false;
          this.setMessage("OK");
        }
      ); 
    } else {
      console.log("UPDATE");
      this.interviewService.update(this.interview, this.selectedEmployees)
      .subscribe(data => this.setMessage(data), 
        error => this.setError(error), 
        () => {
          this.loading = false;
          this.setMessage("OK");
        }
      ); 
    }
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
