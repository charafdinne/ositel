import { TestBed } from '@angular/core/testing';

import { MeetingsService } from './meetings-service.service';

describe('MeetingsServiceService', () => {
  let service: MeetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingsService);
    service.getMeetings();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return meetings', () => {
    expect(service.getMeetings()).not.toBeUndefined;
    expect(service.getMeetings()).not.toEqual([])
  })
});
