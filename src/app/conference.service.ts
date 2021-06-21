import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
timeSlots = [
  {
    title: 'Morning',
    slots: [
      '8:30 AM',
      '9:00 AM',
      '9:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM'
    ]
  },
  {
    title: 'After noon',
    slots: [
      '12:00 PM',
      '12:30 PM',
      '1:00 PM',
      '1:30 PM',
      '2:00 PM',
      '2:30 PM'
    ]
  },
  {
    title: 'Evening',
    slots: [
      '3:30 PM',
      '4:00 PM',
      '4:30 PM',
      '5:00 PM',
      '5:30 PM',
      '6:00 PM',
      '6:30 PM'
    ]
  }
];
bookedSlots = [];
  constructor() { }

  getTimeSlots() {
    return this.timeSlots;
  }
}
