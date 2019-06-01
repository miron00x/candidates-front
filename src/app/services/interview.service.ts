import { Injectable } from '@angular/core';
import { SortDirection } from '../util/sortable.directive';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
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
        let date: String = '';
        if(interview.interviewDateTime) date = interview.interviewDateTime.toISOString().substr(0, interview.interviewDateTime.toISOString().length-5);
        return this.http.put(`${this.baseUrl}?candidateId=${interview.candidate.id}&interviewDateTime=`
            + date + `&status=${interview.status}&employeesId=${employeesId}`
            , interview 
        );
    }

    update(interview: Interview, employeesId: number[]): Observable<any> {
        let date: String = '';
        if(interview.interviewDateTime.toISOString) 
            date = interview.interviewDateTime.toISOString().substr(0, interview.interviewDateTime.toISOString().length-5)
        else
            date = interview.interviewDateTime.toString();
        console.log("UPDATE INTERVIEW ID: " + interview.id);
        return this.http.put(`${this.baseUrl}?id=${interview.id}&candidateId=${interview.candidate.id}&interviewDateTime=`
         + date + `&status=${interview.status}&employeesId=${employeesId}`
            , interview 
        );
    }

    delete(interview: Interview): Observable<any> {
        return this.http.put(`${this.baseUrl}/reset?id=${interview.id}`, interview);
    }
}