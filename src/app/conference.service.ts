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
  bookSlot(date, employeeId, room, slot) {
    const slotData = {
      date,
      employeeId,
      room,
      slot
    };
    this.bookedSlots.push(slotData);
    console.log(this.bookedSlots);
  }
  getAllBookedSlots(date, employeeId) {
    const slots = this.bookedSlots;
    console.log('slots', slots);
    return slots;
  }
  removeSlot(date, employeeId, slot) {
    const index = this.bookedSlots.findIndex(x => x.slot == slot && x.date == date && x.employeeId == employeeId);
    if (index) {
      this.bookedSlots.splice(index, 1);
    }
  }
}
