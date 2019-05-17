import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Interview } from '../domain/interview';
import { Subject } from 'rxjs';
import { InterviewService } from '../services/interview.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { startOfDay, endOfDay } from 'date-fns';
import { colors } from '../calendar/colors';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  interviews: Interview[];

  error: String = '';
  message: String = '';

  modalData: {
    action: string;
    event: String;
  };

  refresh: Subject<any> = new Subject();

  constructor(
    private interviewService: InterviewService, 
    private modal: NgbModal,
    private router: Router) 
  {
    this.reloadData();
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(){
    this.interviewService.getInterviewList().subscribe(
      data => {
        this.interviews = data;
      },
      error => this.setError(error),
      () => this.setMessage("Reload OK")
    );
  }

  handleEvent(action: string, event: String): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    
  }

  editEvent(interview: Interview){

  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.interviewService.delete(eventToDelete.meta)
        .subscribe(data => this.setMessage(data), 
        error => this.setError(error), 
        () => this.setMessage("Delete Ok")
      );
  }

  setMessage(message: string): void {
		this.error = ``;
		this.message = `Message: ${message}`;
	}	

  setError(error: string): void {
		this.error = `Error: ${error}`;
  }	

}
