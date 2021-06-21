import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { removeSlot,bookSlot } from '../actions/conference.actions';

export const timeSlots: State[] = []

export interface State {
  date,
  employeeId,
  room,
  slot
}

const conferenceReducer = createReducer(timeSlots, 
  on(bookSlot, (state, {date, employeeId, room, slot}) => {
    const slotData = {
      date,
      employeeId,
      room,
      slot
    };
    state.push(slotData);
    return state;
}), on(removeSlot, (state, {date, employeeId, slot}) => {
  const index = state.findIndex(x => x.slot == slot && x.date.toDateString() == date.toDateString() && x.employeeId == employeeId);
  if (index) {
    state.splice(index, 1);
    return state;
  }
}));


export const checkSlotAvailabiltiy = (date, room, slot) => {
  const slotIndex = timeSlots.findIndex(x => x.room == room && x.slot == slot && x.date.toDateString() == date.toDateString());
  if (slotIndex > -1) {
    return false;
  }
  return true;
}

export const getAllBookedSlots = (date, employeeId) => {
  const roomSet = new Set(timeSlots.map(x => x.room));
  let rooms = Array.from(roomSet);
  rooms = rooms.sort((a, b) => a - b);
  const roomArray = [];
  rooms.forEach(x => {
    const slots = timeSlots.filter(y => y.date.toDateString() == date.toDateString() && y.room == x && y.employeeId == employeeId);
    if (slots.length) {
      roomArray.push({
        room: x,
        slots: slots
      });
    }
  });
  return roomArray;
}


