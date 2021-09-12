import { Injectable } from '@angular/core';
import { Meeting, MeetingRoom } from '../models';
import data from '../../../assets/mocks/data.json';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor() { }

  getMeetings(): Meeting[] {
    return data.meetings;
  }
}
