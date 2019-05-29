import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../domain/employee';
import { EmployeeService } from '../services/employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  createForm: FormGroup;
  @Input() employee: Employee;
	message = '';
  error = '';
  loading = false;
  submitted = false;

  /*
  public uploader:FileUploader = new FileUploader({
    isHTML5: true
  });
  */

	constructor(
		private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) { }

	ngOnInit() {
    this.createForm = this.formBuilder.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.lastName, Validators.required]
    });
  }

  get form() { return this.createForm.controls; }

	onSubmit() {
    console.log("SUBMIT");
    this.submitted = true;
    if (this.createForm.invalid) {
      alert("invalid form");
        return;
    }
    this.loading = true;
    /*
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if(fileItem.size > 10000000){
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    let files : File[] = [];
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let fileItem = this.uploader.queue[j]._file;
      files.push(fileItem);
    }
    */
    this.employee.firstName = this.form.firstName.value;
    this.employee.lastName = this.form.lastName.value;
    this.employeeService.updateEmployee(this.employee)
      .subscribe(data => this.setMessage(data), error => this.setError(error), () => {this.loading = false});
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
