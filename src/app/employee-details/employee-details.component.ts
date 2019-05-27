import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../domain/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  message: String = '';
  error: String = '';
  
  constructor(private router: Router, 
    private activateRoute: ActivatedRoute,
    private employeeService: EmployeeService
    ) { }

  ngOnInit() {
  }

}
