import { Component, OnInit } from '@angular/core';
import { Department } from '../domain/department';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  
  createForm: FormGroup;
  department: Department  = new Department();
	message = '';
  error = '';
  loading = false;
  submitted = false;
  selectedDepartment: Department;

  departments: Array<Department> = [];
	
	constructor(
		private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService
  ) { }

	ngOnInit() {
    this.createForm = this.formBuilder.group({
      departmentName: ['', Validators.required]
    });
  }

  get form() { return this.createForm.controls; }

	onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
        return;
    }
    this.loading = true;
    this.department.departmentName = this.form.departmentName.value;
    this.departmentService.createDepartment(this.department)
      .subscribe(data => this.setMessage(data), error => this.setError(error), () => this.loading = false);
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
