import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../domain/employee';
import { NgbdSortableHeader, SortEvent } from '../util/sortable.directive';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<Employee[]>;
  total: number = 1;
  pageNumber: number = 1;
  pageSize: number = 4;
  sortColumn: string = 'id';
  sortDirection: string = 'NULL';
  error: String;
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
 
  constructor(private employeeService: EmployeeService, private router: Router) {
    this.reloadData();
  }
  
  onPageChange(pageNumber){
    this.pageNumber = pageNumber;
    this.reloadData();
  }
  
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    alert("onSort " + column + " " + direction);
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'NULL';
      }
    });

    this.sortColumn = column;
    this.sortDirection = direction;
    this.reloadData();
    alert("After onSort");
  }
 
  ngOnInit() {
    this.reloadData();
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
	  this.router.navigate(["employee/details/", employee.id]);
  }

}
