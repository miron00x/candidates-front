import { Injectable } from '@angular/core';
import { SortDirection } from '../util/sortable.directive';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../domain/interview';

@Injectable({
    providedIn: 'root'
})
export class InterviewService {
    private baseUrl = 'http://localhost:8443/api/v1/interview';
	
    constructor(private http: HttpClient) {}
    
    getInterview(id: number): Observable<any> {
		return this.http.get(`${this.baseUrl}/id/${id}`);
    }
    
    getInterviewList(): Observable<any>{
        return this.http.get(`${this.baseUrl}`);
    }
}