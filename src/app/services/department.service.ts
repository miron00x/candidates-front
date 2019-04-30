import { Injectable } from '@angular/core';
import { SortDirection } from '../util/sortable.directive';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../domain/employee';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    private baseUrl = 'http://localhost:8443/api/v1/department';
	
    constructor(private http: HttpClient) {}
    
    getDepartment(id: number): Observable<any> {
		  return this.http.get(`${this.baseUrl}/${id}`);
    }

    getAll(): Observable<any> {
      return this.http.get(this.baseUrl);
    }
    
}