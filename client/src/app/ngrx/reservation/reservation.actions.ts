import { createAction, props } from '@ngrx/store';

import { Reservation } from '../../model/reservation.model';

export const create = createAction(
  '[reservation] Create',
  props<{ reservation: any }>(),
);

export const createSuccess = createAction('[reservation] Create Success');

export const createFailure = createAction(
  '[reservation] Create Failure',
  props<{ errorMessage: string }>(),
);

export const get = createAction(
  '[reservation] Get',
  props<{ customerId: string }>(),
);

export const getSuccess = createAction(
  '[reservation] Get Success',
  props<{ reservations: Reservation[] }>(),
);

export const getFailure = createAction(
  '[reservation] Get Failure',
  props<{ errorMessage: string }>(),
);

export const getOne = createAction(
  '[reservation] Get One',
  props<{ reservationId: string }>(),
);

export const getOneSuccess = createAction(
  '[reservation] Get One Success',
  props<{ reservation: Reservation }>(),
);

export const getOneFailure = createAction(
  '[reservation] Get One Failure',
  props<{ errorMessage: string }>(),
);
export const reset = createAction('[reservation] Reset');

export const updateStatus = createAction(
  '[reservation] Update Status',
  props<{ reservation: Reservation }>(),
);

export const getReservationByStartDate = createAction(
  '[reservation] Get By Start Date',
  props<{ startDate: string }>(),
);

export const getReservationByStartDateSuccess = createAction(
  '[reservation] Get By Start Date Success',
  props<{ reservations: Reservation[] }>(),
);

export const getReservationByStartDateFailure = createAction(
  '[reservation] Get By Start Date Failure',
  props<{ errorMessage: string }>(),
);

export const getReservationByEndDate = createAction(
  '[reservation] Get By End Date',
  props<{ endDate: string }>(),
);

export const getReservationByEndDateSuccess = createAction(
  '[reservation] Get By End Date Success',
  props<{ reservations: Reservation[] }>(),
);

export const getReservationByEndDateFailure = createAction(
  '[reservation] Get By End Date Failure',
  props<{ errorMessage: string }>(),
);

export const deleteReservation = createAction(
  '[Reservation] Delete',
  props<{ reservationId: string }>(),
);

export const deleteReservationSuccess = createAction(
  '[Reservation] Delete Success',
);
export const deleteReservationFailure = createAction(
  '[Reservation] Delete Failure',
  props<{ errorMessage: string }>(),
);
