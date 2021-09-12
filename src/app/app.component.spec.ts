import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, CalendarView, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        })
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });


  it(`should have as title 'ositelTechnicalAssessment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ositelTechnicalAssessment');
  });


  it('should change view depending on granularity', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    //day
    app.setView(CalendarView.Day)
    expect(app.view).toEqual(CalendarView.Day)
    //week
    app.setView(CalendarView.Week)
    expect(app.view).toEqual(CalendarView.Week)
    //month
    app.setView(CalendarView.Month)
    expect(app.view).toEqual(CalendarView.Month)
  })
});
