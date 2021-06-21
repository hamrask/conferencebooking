import { createAction, props } from '@ngrx/store';

export const getTimeSlots = createAction('[Conference Component] getTimeSlots');
export const bookSlot = createAction('[Conference Component] bookSlot', props<{date, employeeId, room, slot}>());
export const getAllBookedSlots = createAction('[Conference Component] getAllBookedSlots', props<{date, employeeId}>());
export const removeSlot = createAction('[Conference Component] bookSlot', props <{ date, employeeId, slot}>());


