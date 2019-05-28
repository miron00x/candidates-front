import { Component, OnInit, ViewChildren, QueryList, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../domain/employee';
import { NgbdSortableHeader, SortEvent } from '../util/sortable.directive';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from '../services/department.service';
import { Department } from '../domain/department';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  modalData: {
    action: string;
    employee: Employee;
  };

  employees: Observable<Employee[]>;
  departments: Department[];
  total: number = 1;
  pageNumber: number = 1;
  pageSize: number = 7;
  sortColumn: string = 'id';
  sortDirection: string = 'NULL';
  error: String;
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
 
  constructor(private employeeService: EmployeeService, 
    private departmentService: DepartmentService,
    private router: Router, 
    private modal: NgbModal) {
    this.reloadData();
  }
  
  onPageChange(pageNumber){
    this.pageNumber = pageNumber;
    this.reloadData();
  }
  
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'NULL';
      }
    });
    
    switch(direction.valueOf()){
      case "ASC" : document.getElementById(column.valueOf()).className="fa fa-hand-o-down";
        document.getElementById(column.valueOf()).style.display="inline"; 
        break;
      case "DESC": document.getElementById(column.valueOf()).className="fa fa-hand-o-up"; 
        document.getElementById(column.valueOf()).style.display="inline"; 
        break;
      case "NULL": document.getElementById(column.valueOf()).style.display="none"; break;
    }

    this.sortColumn = column;
    this.sortDirection = direction;
    this.reloadData();
  }
 
  ngOnInit() {
    this.fillDepartments();
    this.reloadData();
  }

  handleEvent(action: string, employee: Employee): void {
    this.modalData = { employee, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEmployee(){
    this.handleEvent("Create", null);
  }
 
  deleteEmployees() {
    this.employeeService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => this.setError(error));
  }

  fillDepartments(){
    this.departmentService.getAll().subscribe(
      data => {
        this.departments = data;
      }
    );
  }

  getDepartmentName(id: string){
    let depName : string;
    if(this.departments){
      this.departments.map((department : Department) => {
        if(department.id.toString() === id) depName = department.departmentName;
      });
    }
    return depName;
  }
 
  reloadData() {
    this.employeeService.getTotal().subscribe(
      data => {
        this.total = data;
      },
      error => this.setError(error)
    );
    this.employeeService.getEmployeesPage(this.pageNumber, this.pageSize, this.sortColumn, this.sortDirection)
    .subscribe(
      data => {
        this.employees = data;
      },
      error => this.setError(error)
    );
	}

	setError(error: string): void {
		this.error = `Error: ${error}`;
	}	
  
  employeeDetails(employee: Employee){
	  this.router.navigate(["employee-details/", employee.id]);
  }

}
