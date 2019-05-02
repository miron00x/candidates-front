import { Injectable } from '@angular/core';
import { SortDirection } from '../util/sortable.directive';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../domain/candidate';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    private baseUrl = 'http://localhost:8443/api/v1/candidate';
	
    constructor(private http: HttpClient) {}
    
    getCandidate(id: number): Observable<any> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	createCandidate(candidate: Candidate): Observable<any> {
		const req = new HttpRequest('PUT', `${this.baseUrl}`, candidate);
		let result = this.http.request(req);
		return result;
	}

	updateCandidate(candidate: Candidate): Observable<any> {
		return this.http.post(`${this.baseUrl}/upd`, candidate);
	}

	deleteCandidate(id: number): Observable<any> {
		let result = this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
		return result;
	}

	getCandidateList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
	
	getCandidatesPage(page: number, pageSize: number, sortColumn: string, sortDirection: string): Observable<any> {
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