import { Component, OnInit, ViewChild, TemplateRef, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { Department } from '../domain/department';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../util/sortable.directive';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  modalData: {
    action: string;
    department: Department;
  };

  departments: Observable<Department[]>;
  page: number = 1;
  /*total: number = 1;
  pageNumber: number = 1;
  pageSize: number = 7;
  sortColumn: string = 'id';
  sortDirection: string = 'NULL';*/
  error: String;
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
 
  constructor(private departmentService: DepartmentService,
     private router: Router,
      private modal: NgbModal) {
    this.reloadData();
  }
  
  /*
  onPageChange(pageNumber){
    this.pageNumber = pageNumber;
    this.reloadData();
  }
  */

  handleEvent(action: string, department: Department): void {
    this.modalData = { department, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  
  /*
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
    //document.getElementById(column.valueOf()).className="fa fa-hand-o-down";
    this.sortColumn = column;
    this.sortDirection = direction;
    this.reloadData();
  }
  */
 
  ngOnInit() {
    this.reloadData();
  }
 
  deleteDepartments() {
    this.departmentService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => this.setError(error));
  }

  addDepartment(){
    this.handleEvent("Create", null);
  }
 
  deleteDepartment(department: Department){
    this.departmentService.deleteDepartment(department)
    .subscribe(
      data => {
        this.reloadData();
      },
      error => this.setError(error)),
      () => this.reloadData();
  }
  
  reloadData() {
    /*
    this.departmentService.getTotal().subscribe(
      data => {
        this.total = data;
      },
      error => this.setError(error)
    );
    this.departmentService.getDepartmentsPage(this.pageNumber, this.pageSize, this.sortColumn, this.sortDirection)
    .subscribe(
      data => {
        this.departments = data;
      },
      error => this.setError(error)
    );
    */
    this.departmentService.getAll()
    .subscribe(
      data => {
        this.departments = data;
      },
      error => this.setError(error)
    );
  }
  

	setError(error: string): void {
		this.error = `Error: ${error}`;
	}	

}
