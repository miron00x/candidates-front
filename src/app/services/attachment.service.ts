import { Injectable } from '@angular/core';
import { SortDirection } from '../util/sortable.directive';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../domain/employee';

@Injectable({
    providedIn: 'root'
})
export class AttachmentService {
    private baseUrl = 'http://localhost:8443/api/v1/attachment';
	
    constructor(private http: HttpClient) {}
    
    downloadAttachmentById(id: string): Observable<any> {
		return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
    }

    getAll(): Observable<any> {
      return this.http.get(`${this.baseUrl}/all`);
    }
    
}