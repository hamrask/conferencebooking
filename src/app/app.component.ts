import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConferenceService } from './conference.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'conference';
  dataArray = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  TimeSlots = [];
  existingBookings = [];

  constructor(private _formBuilder: FormBuilder, private service: ConferenceService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      employeeId: ['', Validators.required],
      date: ['', Validators.required],
      room: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      slot: ['', Validators.required]
    });
    this.TimeSlots = this.service.getTimeSlots();
  }

  bookSlot(slot) {
    const employeeId = this.firstFormGroup.get('employeeId').value;
    const date = this.firstFormGroup.get('date').value;
    this.secondFormGroup.get('slot').setValue(slot);
  }
  confirmSlot() {
    const employeeId = this.firstFormGroup.get('employeeId').value;
    const date = this.firstFormGroup.get('date').value;
    const slot = this.secondFormGroup.get('slot').value;
    const room = this.firstFormGroup.get('room').value;
    if (slot) {
      this.service.bookSlot(date, employeeId, room, slot);
    }
  }
  getExistingBookings() {
    console.log('getting current bookings');
    const employeeId = this.firstFormGroup.get('employeeId').value;
    const date = this.firstFormGroup.get('date').value;
    this.existingBookings = this.service.getAllBookedSlots(date, employeeId);
    console.log(this.existingBookings);
  }
  removeSlot(slot){
    const employeeId = this.firstFormGroup.get('employeeId').value;
    const date = this.firstFormGroup.get('date').value;
    this.service.removeSlot(date, employeeId, slot);
  }
}
