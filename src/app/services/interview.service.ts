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
        return this.http.get(`${this.baseUrl}/all`);
    }

    createInterview(interview: Interview, employeesId: number[]): Observable<any> {
        let request = {
            "candidateId" : interview.candidate.id,
            "interviewDateTime" : interview.interviewDateTime,
            "status" : interview.status,
            "employeesId" : employeesId
        };
        console.log(interview.interviewDateTime);
        return this.http.put(`${this.baseUrl}?candidateId=${interview.candidate.id}&interviewDateTime=`
            + request.interviewDateTime.toISOString().substr(0, request.interviewDateTime.toISOString().length-5) + `&status=${interview.status}&employeesId=${employeesId}`
            , request 
        );
    }

    update(interview: Interview, employeesId: number[]): Observable<any> {
        let request = {
            "id" : interview.id,
            "candidateId" : interview.candidate.id,
            "interviewDateTime" : interview.interviewDateTime,
            "status" : interview.status,
            "employeesId" : employeesId
        };
        console.log(request.interviewDateTime.toISOString());
        return this.http.put(`${this.baseUrl}?id=${interview.id}&candidateId=${interview.candidate.id}&interviewDateTime=`
         + request.interviewDateTime.toISOString().substr(0, request.interviewDateTime.toISOString().length-5) + `&status=${interview.status}&employeesId=${employeesId}`
            , request 
        );
    }

    delete(interview: Interview): Observable<any> {
        return this.http.put(`${this.baseUrl}/reset?id=${interview.id}`, interview);
    }
}