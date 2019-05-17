import { Component, OnInit } from '@angular/core';
import { Candidate } from '../domain/candidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})
export class CreateCandidateComponent implements OnInit {

  createForm: FormGroup;
  candidate: Candidate  = new Candidate();
	message = '';
  error = '';
  loading = false;
  submitted = false;

	constructor(
		private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private candidateService: CandidateService
  ) { }

	ngOnInit() {
    this.createForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', Validators.required],
      skype: ['', Validators.required],
      mail: ['', Validators.email],
      description: ['', Validators.required],
    });
  }

  get form() { return this.createForm.controls; }

	onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      alert("this.form.departmentName.value");
        return;
    }
    this.loading = true;
    this.candidate.firstName = this.form.firstName.value;
    this.candidate.lastName = this.form.lastName.value;
    this.candidate.telephone = this.form.telephone.value;
    this.candidate.mail = this.form.mail.value;
    this.candidate.skype = this.form.skype.value;
    this.candidate.description = this.form.description.value;
    this.candidateService.createCandidate(this.candidate)
      .subscribe(data => this.setMessage(data), error => this.setError(error), () => this.router.navigate(['/candidate-list']));
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
