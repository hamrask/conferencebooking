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

export const conferenceReducer = createReducer(timeSlots, 
  on(bookSlot, (state, {date, employeeId, room, slot}) => {
    const slotData = {
      date,
      employeeId,
      room,
      slot
    };
    state = [...state, slotData];
    console.log(state);
    return state;
}), on(removeSlot, (state, {date, employeeId, slot}) => {
  const index = state.findIndex(x => x.slot == slot && x.date.toDateString() == date.toDateString() && x.employeeId == employeeId);
  if (index) {
    state.splice(index, 1);
    return state;
  }
}));

