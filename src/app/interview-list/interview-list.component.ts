import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Interview } from '../domain/interview';
import { Subject } from 'rxjs';
import { InterviewService } from '../services/interview.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { startOfDay, endOfDay } from 'date-fns';
import { colors } from '../calendar/colors';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventAction } from 'angular-calendar';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  interviews: Interview[];
  events: CalendarEvent[];

  error: String = '';
  message: String = '';

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

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
        this.updateEvents();
      },
      error => this.setError(error),
      () => this.setMessage("Reload OK")
    );
  }

  updateEvents(){
    this.events = [];
    for(let interview of this.interviews){
      var date : Date = new Date(interview.interviewDateTime);
      var date_end : Date = new Date(interview.interviewDateTime);
      date_end.setMinutes(60);  // +1 час
      let event: CalendarEvent = {
        id: this.events.length,
        title: interview.candidate.firstName + ` ` + interview.candidate.lastName,
        start: date,
        end: date_end,
        color: colors.red,
        actions: this.actions,
        meta: interview,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      }
      this.events.push(event);
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
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
