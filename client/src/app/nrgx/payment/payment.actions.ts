import { createAction, props } from '@ngrx/store';
import { Payment } from '../../model/payment.model';

export const create = createAction(
  '[payment] Create',
  props<{ payment: any }>(),
);
export const createSuccess = createAction('[payment] Create Success');
export const createFailure = createAction(
  '[payment] Create Failure',
  props<{ errorMessage: string }>(),
);
export const get = createAction(
  '[payment] Get',
  props<{ reservationId: string }>(),
);
export const getSuccess = createAction(
  '[payment] Get Success',
  props<{ payment: Payment }>(),
);
export const getFailure = createAction(
  '[payment] Get Failure',
  props<{ errorMessage: string }>(),
);

export const reset = createAction('[payment] Reset');
