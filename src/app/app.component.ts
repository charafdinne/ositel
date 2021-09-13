import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth} from 'date-fns';
import { Meeting } from './core/models';
import { MeetingsService } from './core/services/meetings-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //modal
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;
  
  title = 'ositelTechnicalAssessment';

  viewDate: Date = new Date();

  //boolean to view the meetings on clicked day
  activeDayIsOpen: boolean = false;

  //type of view to show (Month/Week/day)
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  //object containing meetings
  events: CalendarEvent<String>[] = [];

  //data passed to the modal
  modalData: CalendarEvent | undefined;

  //injecting meetingsService to get data from data.json and the service for opening modal windows
  constructor(private meetingsService: MeetingsService,private modal: NgbModal) {    
  }

  ngOnInit(){    
    this.populateEvents(this.meetingsService.getMeetings());
  }

  //method populating events from data.json in the calendar
  populateEvents(meetings : Meeting[]){
    for (let meeting of meetings) {
      this.events.push(
        {
          start: new Date(meeting.start),
          end: new Date(meeting.end),
          title: meeting.name,
          meta : meeting.meetingRoom
        }
      )
    }
  }

  //changing the view on demand
  setView(view: CalendarView) {
    this.view = view;
  }

  //managing the activeDayIsOpen upon the click on a day in the calendar event
  dayClicked({ day, sourceEvent }: { day: CalendarMonthViewDay; sourceEvent: any; }): void {
    if (isSameMonth(day.date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, day.date) && this.activeDayIsOpen === true) ||
        sourceEvent.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = day.date;
    }
  }

  handleEvent(event: CalendarEvent): void {
    this.modalData = event;
    this.modal.open(this.modalContent, { size: 'lg' });
  }
}
