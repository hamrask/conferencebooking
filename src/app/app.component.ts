import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ConferenceService } from './conference.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  title = 'conference';
  dataArray = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  TimeSlots = [];
  existingBookings = [];
  minDate = new Date();
  

  constructor(private _formBuilder: FormBuilder, private service: ConferenceService, private snack: MatSnackBar, private store: Store) {}

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
    const room = this.firstFormGroup.get('room').value;
    const date = this.firstFormGroup.get('date').value;
    if (this.store.dispatch('checkSlotAvailabiltiy',{date, room, slot})) {
      this.secondFormGroup.get('slot').setValue(slot);
    } else {
      this.snack.open('Selected slot does not available', '', {duration: 800});
    }
  }
  confirmSlot() {
    const employeeId = this.firstFormGroup.get('employeeId').value;
    const date = this.firstFormGroup.get('date').value;
    const slot = this.secondFormGroup.get('slot').value;
    const room = this.firstFormGroup.get('room').value;
    if (slot) {
      this.store.dispatch()(date, employeeId, room, slot);
    }
  }
  getExistingBookings() {
    const employeeId = this.firstFormGroup.get('employeeId').value;
    const date = this.firstFormGroup.get('date').value;
    this.existingBookings = this.service.getAllBookedSlots(date, employeeId);
  }
  removeSlot(slot){
    const employeeId = this.firstFormGroup.get('employeeId').value;
    const date = this.firstFormGroup.get('date').value;
    this.service.removeSlot(date, employeeId, slot);
    this.getExistingBookings();
  }
  resetForm() {
    this.formDirective.reset();
    this.formDirective.resetForm();
  }
}
