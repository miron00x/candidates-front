import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Interview } from '../domain/interview';
import { InterviewService } from '../services/interview.service';
import { Router } from '@angular/router';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { colors } from './colors';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  interviews: Interview[] = [];

  clickedDate: Date;

  clickedColumn: number;

  error: string;

  constructor(private interviewService: InterviewService, private router: Router) {
    this.reloadData();
  }

  ngOnInit() {
  }

  reloadData(){
    this.interviewService.getInterviewList().subscribe(
      data => {
        this.interviews = data;
      },
      error => this.setError(error)
    );
    for(let interview of this.interviews){
      let event: CalendarEvent;
      event.title = interview.candidate.firstName;
      event.start = interview.interviewDate;
      event.end = new Date(interview.interviewDate.getDate() + 1000);
      event.draggable = true;
      event.color = colors.red;
      this.events.push(event);
    }
  }

  setError(error: string): void {
		this.error = `Error: ${error}`;
  }	
  
}
