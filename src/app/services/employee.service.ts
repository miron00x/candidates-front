import { Injectable } from '@angular/core';
import { SortDirection } from '../util/sortable.directive';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../domain/employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private baseUrl = 'http://localhost:8443/api/v1/employee';
	
    constructor(private http: HttpClient) {}
    
    getEmployee(id: number): Observable<any> {
		return this.http.get(`${this.baseUrl}/id/${id}`);
	}

	createEmployee(employee: Employee): Observable<any> {
		const req = new HttpRequest('POST', `${this.baseUrl}/create`, employee);
		let result = this.http.request(req);
		return result;
	}

	updateEmployee(employee: Employee): Observable<any> {
		return this.http.post(`${this.baseUrl}/upd`, employee);
	}

	deleteEmployee(id: number): Observable<any> {
		let result = this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
		return result;
	}

	getEmployeeList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
	
	getEmployeesPage(page: number, pageSize: number, sortColumn: string, sortDirection: string): Observable<any> {
		return this.http.get(
			`${this.baseUrl}` + `/page?page=` + (page - 1) + `&size=` + pageSize 
			+ `&sortColumn=` + sortColumn + `&sortDirection=` + sortDirection
		);
	}

	getTotal(): Observable<any>{
		return this.http.get(`${this.baseUrl}/total`);
	}
	
	deleteAll(): Observable<any> {
		let result = this.http.delete(`${this.baseUrl}` + `/delete`);
		return result;
	}
}