import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Candidate } from '../domain/candidate';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})
export class EditCandidateComponent implements OnInit {

  createForm: FormGroup;
  @Input() candidate: Candidate;
	message = '';
  error = '';
  loading = false;
  submitted = false;

  public uploader:FileUploader = new FileUploader({
    isHTML5: true
  });

	constructor(
		private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private candidateService: CandidateService
  ) { }

	ngOnInit() {
    this.createForm = this.formBuilder.group({
      firstName: [this.candidate.firstName, Validators.required],
      lastName: [this.candidate.lastName, Validators.required],
      telephone: [this.candidate.telephone, Validators.required],
      skype: [this.candidate.skype, Validators.required],
      mail: [this.candidate.mail, Validators.email],
      description: [this.candidate.description, Validators.required]
    });
  }

  get form() { return this.createForm.controls; }

	onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
        return;
    }
    this.loading = true;
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if(fileItem.size > 10000000){
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    let files : File[] = [];
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let fileItem = this.uploader.queue[j]._file;
      files.push(fileItem);
    }
    this.candidate.firstName = this.form.firstName.value;
    this.candidate.lastName = this.form.lastName.value;
    this.candidate.telephone = this.form.telephone.value;
    this.candidate.mail = this.form.mail.value;
    this.candidate.skype = this.form.skype.value;
    this.candidate.description = this.form.description.value;
    this.candidateService.updateCandidate(this.candidate, files)
      .subscribe(data => this.setMessage("Ok"), error => this.setError(error), () => {this.loading = false});
	}
	
	setMessage(message: string): void {
		this.error = ``;
		this.message = `Success: ${message}`;
	}	
	
	setError(error: string): void {
		this.message = ``;
		this.error = `Error: ${error}`;
	}	

}
