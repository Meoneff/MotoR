//motor.actions.ts
import { createAction, props } from '@ngrx/store';
import { Motor } from '../../model/motor.model';

export const getSuccess = createAction(
  '[Motor] Get Success',
  props<{ motorList: Motor }>(),
);

export const get = createAction(
  '[Motor] get all',
  props<{ featured?: boolean }>(),
);

export const loadMotors = createAction('[Motor] Load Motors');
export const loadMotorsSuccess = createAction(
  '[Motor] Load Motors Success',
  props<{ motors: Motor[] }>(),
);
export const loadMotorsFailure = createAction(
  '[Motor] Load Motors Failure',
  props<{ error: any }>(),
);

export const create = createAction(
  '[Motor] Create Motor',
  props<{ motor: any }>(),
);
export const createMotor = createAction(
  '[Motor] Create Motor',
  props<{ motor: Motor }>(),
);
export const createMotorSuccess = createAction(
  '[Motor] Create Motor Success',
  props<{ motor: Motor }>(),
);
export const createMotorFailure = createAction(
  '[Motor] Create Motor Failure',
  props<{ error: any }>(),
);
export const updateMotor = createAction(
  '[Motor] Update Motor',
  props<{ motor: Motor }>(),
);
export const updateMotorSuccess = createAction(
  '[Motor] Update Motor Success',
  props<{ motor: Motor }>(),
);
export const updateMotorFailure = createAction(
  '[Motor] Update Motor Failure',
  props<{ error: any }>(),
);
export const deleteMotor = createAction(
  '[Motor] Delete Motor',
  props<{ id: number }>(),
);
export const deleteMotorSuccess = createAction(
  '[Motor] Delete Motor Success',
  props<{ id: number }>(),
);
export const deleteMotorFailure = createAction(
  '[Motor] Delete Motor Failure',
  props<{ error: any }>(),
);

export const addtoCart = createAction(
  '[Motor] Add to Cart',
  props<{ Motor: Motor }>(),
);
export const addtoDetail = createAction(
  '[Motor] Add to Detail',
  props<{ dish: Motor }>(),
);
export const getFailure = createAction(
  '[Motor] get failure',
  props<{ getErrMess: any }>(),
);
// Path: client/src/app/nrgx/motor/motor.effects.ts
// Compare this snippet from client/src/app/model/motorcycle.model.ts:
// export interface Motorcycle {
//   id: number;
//   model: string;
//   year: number;
//   engineCapacity: number;

//   rentalPricePerDay: number;
//   available: boolean;
// }
