import { Component, OnInit, ViewChildren, QueryList, ViewChild, TemplateRef } from '@angular/core';
import { Candidate } from '../domain/candidate';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../util/sortable.directive';
import { CandidateService } from '../services/candidate.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  modalData: {
    action: string;
    candidate: Candidate;
  };

  candidates: Observable<Candidate[]>;
  total: number = 1;
  pageNumber: number = 1;
  pageSize: number = 7;
  sortColumn: string = 'id';
  sortDirection: string = 'NULL';
  error: String;
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
 
  constructor(private candidateService: CandidateService,
     private router: Router,
      private modal: NgbModal) {
    this.reloadData();
  }
  
  onPageChange(pageNumber){
    this.pageNumber = pageNumber;
    this.reloadData();
  }

  handleEvent(action: string, candidate: Candidate): void {
    this.modalData = { candidate, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = 'NULL';
      }
    });

    this.sortColumn = column;
    this.sortDirection = direction;
	  this.reloadData();
  }
 
  ngOnInit() {
    this.reloadData();
  }
 
  deleteCandidates() {
    this.candidateService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => this.setError(error));
  }

  addCandidate(){
    this.handleEvent("Create", null);
  }
 
  reloadData() {
    this.candidateService.getTotal().subscribe(
      data => {
        this.total = data;
      },
      error => this.setError(error)
    );
    this.candidateService.getCandidatesPage(this.pageNumber, this.pageSize, this.sortColumn, this.sortDirection)
    .subscribe(
      data => {
        this.candidates = data;
      },
      error => this.setError(error)
    );
	}

	setError(error: string): void {
		this.error = `Error: ${error}`;
	}	
  
  candidateDetails(candidate: Candidate){
	  this.router.navigate(["candidate-details/", candidate.id]);
  }

}
