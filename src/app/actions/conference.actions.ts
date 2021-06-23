import { createAction, props } from '@ngrx/store';

export const bookSlot = createAction('[Conference Component] bookSlot', props<{date, employeeId, room, slot}>());
export const removeSlot = createAction('[Conference Component] bookSlot', props <{ date, employeeId, slot}>());


