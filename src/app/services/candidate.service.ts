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

	getAll(): Observable<any> {
		return this.http.get(`${this.baseUrl}/all`);
	}

	createCandidate(candidate: Candidate, files: File[]): Observable<any> {
		let formData = new FormData();
		for (var i = 0; i < files.length; i++) {
			formData.append("uploadFile", files[i]);
		}
		formData.append('candidate', JSON.stringify(candidate));
		const req = new HttpRequest('PUT', `${this.baseUrl}`, formData);
		let result = this.http.request(req);
		return result;
	}

	updateCandidate(candidate: Candidate, files: File[]): Observable<any> {
		let formData = new FormData();
		for (var i = 0; i < files.length; i++) {
			formData.append("uploadFile", files[i]);
		}
		formData.append('candidate', JSON.stringify(candidate));
		const req = new HttpRequest('PUT', `${this.baseUrl}/update`, formData);
		let result = this.http.request(req);
		return result;
	}

	deleteCandidate(id: number): Observable<any> {
		let result = this.http.put(`${this.baseUrl}/reset?id=${id}`, { responseType: 'text' });
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