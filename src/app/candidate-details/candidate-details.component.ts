import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Candidate } from '../domain/candidate';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateService } from '../services/candidate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AttachmentService } from '../services/attachment.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {

  candidate: Candidate;
  message: String = '';
  error: String = '';

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  modalData: {
    action: string;
    candidate: Candidate;
  };
  
  constructor(private router: Router, 
    private activateRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private attachmentService: AttachmentService,
    private modal: NgbModal
    ) {
      
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.candidateService.getCandidate(this.activateRoute.snapshot.params['id']).subscribe(
      data => this.candidate = data,
      error => this.error = error
      );
  }

  editCandidate(){
    this.handleEvent("Edit", this.candidate);
  }

  deleteCandidate(){
    this.candidateService.deleteCandidate(this.candidate.id).subscribe(
      data => this.message = data,
      error => this.error = error,
      () => this.router.navigate(["candidate-list"])
    );
  }

  downloadAttachment(id : string){
    this.attachmentService.downloadAttachmentById(id).subscribe(data => {
      window.open(window.URL.createObjectURL(data))
    });
  }

  handleEvent(action: string, candidate: Candidate): void {
    this.modalData = { action, candidate };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

}
