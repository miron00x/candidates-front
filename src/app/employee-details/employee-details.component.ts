import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../domain/employee';
import { AttachmentService } from '../services/attachment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  
  employee: Employee;
  message: String = '';
  error: String = '';

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  modalData: {
    action: string;
    employee: Employee;
  };
  
  constructor(private router: Router, 
    private activateRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private attachmentService: AttachmentService,
    private modal: NgbModal
    ) {
      this.reloadData();
     }

  ngOnInit() {
  }

  editEmployee(){
    this.handleEvent("Edit", this.employee);
  }

  deleteEmployee(){
    this.employeeService.deleteEmployee(this.employee.id).subscribe(
      data => this.message = data,
      error => this.error = error,
      () => this.router.navigate(["employee-list"])
    );
  }

  reloadData(){
    this.employeeService.getEmployee(this.activateRoute.snapshot.params['id']).subscribe(
      data => this.employee = data,
      error => this.error = error
    );
  }

  downloadAttachment(id : string){
    this.attachmentService.downloadAttachmentById(id).subscribe(data => {
      window.open(window.URL.createObjectURL(data))
    });
  }

  handleEvent(action: string, employee: Employee): void {
    this.modalData = { action, employee };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


}
