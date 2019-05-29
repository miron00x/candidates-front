import { Injectable } from '@angular/core';
import { SortDirection } from '../util/sortable.directive';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../domain/employee';
import { Department } from '../domain/department';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    private baseUrl = 'http://localhost:8443/api/v1/department';
	
    constructor(private http: HttpClient) {}
    
    createDepartment(department: Department): Observable<any> {
		  return this.http.put(`${this.baseUrl}?departmentName=${department.departmentName}`, department);
    }

    getDepartment(id: string): Observable<any> {
		  return this.http.get(`${this.baseUrl}/${id}`);
    }

    getAll(): Observable<any> {
      return this.http.get(`${this.baseUrl}/all`);
    }

    getDepartmentsPage(page: number, pageSize: number, sortColumn: string, sortDirection: string): Observable<any> {
      return this.http.get(
        `${this.baseUrl}` + `/page?page=` + (page - 1) + `&size=` + pageSize 
        + `&sortColumn=` + sortColumn + `&sortDirection=` + sortDirection
      );
    }
  
    getTotal(): Observable<any>{
      return this.http.get(`${this.baseUrl}/total`);
    }

    deleteDepartment(department: Department): Observable<any> {
      let result = this.http.delete(`${this.baseUrl}` + `/delete`);
      return result;
    }

    deleteAll(): Observable<any> {
      let result = this.http.delete(`${this.baseUrl}` + `/delete`);
      return result;
    }
    
}