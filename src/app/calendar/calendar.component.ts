import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { Interview } from '../domain/interview';
import { InterviewService } from '../services/interview.service';
import { Router } from '@angular/router';
import { colors } from './colors';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'flatpickr/dist/flatpickr.css';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  interviews: Interview[];

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

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

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
      () => this.updateEvents()
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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        let newEvent = {
          ...event,
          start: newStart,
          end: newEnd
        };
        newEvent.meta.interviewDateTime = newEvent.start;
        this.interviewService.update(newEvent.meta)
          .subscribe(data => this.setMessage(data), 
          error => this.setError(error), 
          () => this.setMessage("Update Ok")
        );
        this.viewDate = newEvent.start;
        return newEvent;
      }
      return iEvent;
    });
    //this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    let event = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      actions: this.actions,
      meta: {},
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    };
    this.handleEvent("Create", event);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.interviewService.delete(eventToDelete.meta)
        .subscribe(data => this.setMessage(data), 
        error => this.setError(error), 
        () => this.setMessage("Delete Ok")
      );
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setMessage(message: string): void {
		this.error = ``;
		this.message = `Message: ${message}`;
	}	

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setError(error: string): void {
		this.error = `Error: ${error}`;
  }	
  
}