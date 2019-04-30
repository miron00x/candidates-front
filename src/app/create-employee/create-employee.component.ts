import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../domain/department';
import { Employee } from '../domain/employee';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createForm: FormGroup;
  employee: Employee  = new Employee();
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
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) { }

	ngOnInit() {
    this.fillDepartaments();
    this.createForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      departmentName: ['', Validators.required]
    });
  }
  
  fillDepartaments(){
    this.departmentService.getAll()
      .subscribe(data => this.departments=data, error => this.setError(error));
  }

  updateSelectedValue(event:Department): void{
    this.selectedDepartment = event;
    console.log(this.selectedDepartment);
  }

  get form() { return this.createForm.controls; }

	onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      alert("this.form.departmentName.value");
        return;
    }
    this.loading = true;
    this.employee.firstName = this.form.firstName.value;
    this.employee.lastName = this.form.lastName.value;
    this.employee.department = this.selectedDepartment;
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => this.setMessage(data), error => this.setError(error));
		/*if(!this.file_id){
			this.documentService.createDocument(this.file)
			.subscribe((response: Document) => {
				if (response) {
					this.setMessage(response.docName);
				} 
			}, error => this.setError(error));
		} else {
			this.documentService.updateDocument(this.file_id, this.file)
			.subscribe((response: Document) => {
				if (response) {
					this.setMessage(response.docName);
				} 
			}, error => this.setError(error));
    }*/
    this.router.navigate(['/employee-list']);
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
