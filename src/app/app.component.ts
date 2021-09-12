import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth, startOfDay} from 'date-fns';
import { Meeting } from './core/models';
import { MeetingsService } from './core/services/meetings-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;
  
  title = 'ositelTechnicalAssessment';

  viewDate: Date = new Date();

  activeDayIsOpen: boolean = false;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  events: CalendarEvent<String>[] = [];

  modalData: CalendarEvent | undefined;


  constructor(private meetingsService: MeetingsService,private modal: NgbModal) {
    this.populateEvents(meetingsService.getMeetings());
  }

  populateEvents(meetings : Meeting[]){
    console.log(new Date())
    for (let meeting of meetings) {
      this.events.push(
        {
          start: startOfDay(new Date(meeting.start)),
          end: startOfDay(new Date(meeting.end)),
          title: meeting.name,
          meta : meeting.meetingRoom
        }
      )
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

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
    console.log(this.modalData)
    this.modal.open(this.modalContent, { size: 'lg' });
  }
}
