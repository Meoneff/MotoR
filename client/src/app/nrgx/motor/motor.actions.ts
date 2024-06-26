//motor.actions.ts
import { createAction, props } from '@ngrx/store';
import { Motor } from '../../model/motor.model';

//////////////////////////////////////////
//getMotor
export const get = createAction(
  '[Motor] get all',
  props<{ isConfirmed: boolean }>(),
);
export const getSuccess = createAction(
  '[Motor] Get Success',
  props<{ motorList: Motor[] }>(),
);
export const getFailure = createAction(
  '[Motor] get all failure',
  props<{ getErrMess: any }>(),
);

///////////////////////////////////////

////////////////////////////////////////

export const loadMotors = createAction('[Motor] Load Motors');
export const loadMotorsSuccess = createAction(
  '[Motor] Load Motors Success',
  props<{ motors: Motor[] }>(),
);
export const loadMotorsFailure = createAction(
  '[Motor] Load Motors Failure',
  props<{ error: any }>(),
);

////////////////////////////////

export const create = createAction(
  '[Motor] Create Motor',
  props<{ motor: any }>(),
);
export const createMotor = createAction(
  '[Motor] Create Motor',
  props<{ motor: any }>(),
);
export const createMotorSuccess = createAction(
  '[Motor] Create Motor Success',
  props<{ motor: Motor }>(),
);
export const createMotorFailure = createAction(
  '[Motor] Create Motor Failure',
  props<{ error: any }>(),
);

/////////////////////

export const updateMotor = createAction(
  '[Motor] Update Motor',
  props<{ motor: any }>(),
);
export const updateMotorSuccess = createAction(
  '[Motor] Update Motor Success',
  props<{ motor: Motor }>(),
);
export const updateMotorFailure = createAction(
  '[Motor] Update Motor Failure',
  props<{ error: any }>(),
);

/////////////////////////////////////////

export const deleteMotor = createAction(
  '[Motor] Delete Motor',
  props<{ motorId: string }>(),
);
export const deleteMotorSuccess = createAction(
  '[Motor] Delete Motor Success',
  props<{ motorId: string }>(),
);
export const deleteMotorFailure = createAction(
  '[Motor] Delete Motor Failure',
  props<{ error: any }>(),
);

///////////////////////////////////////////

export const confirm = createAction(
  '[Motor] confirm',
  props<{ motorId: string }>(),
);
export const confirmSuccess = createAction('[Motor] confirm success');
export const confirmFailure = createAction(
  '[Motor] confirm failure',
  props<{ error: any }>(),
);
///////////////////////////////////
export const resetAddSuccess = createAction('[motor] reset is add success');
//////////////////////////////////

export const updateAllStatusTrue = createAction(
  '[motor] update status all',
  props<{ ids: string[] }>(),
);
export const updateAllStatusTrueSuccess = createAction(
  '[motor] update status all success',
);
export const updateAllStatusTrueFailure = createAction(
  '[motor] update status all failure',
  props<{ error: any }>(),
);

//////////////////////////////////////
export const updateAllStatusFalse = createAction(
  '[motor] update status false all',
  props<{ ids: string[] }>(),
);
export const updateAllStatusFalseSuccess = createAction(
  '[motor] update status false all success',
);
export const updateAllStatusFalseFailure = createAction(
  '[motor] update status false all failure',
  props<{ error: any }>(),
);

///////////////////////
export const resetUpdateAllStatus = createAction(
  '[motor] reset update all status',
);

/////////////////////////////////////////
export const addtoCart = createAction(
  '[Motor] Add to Cart',
  props<{ Motor: Motor }>(),
);
export const addtoDetail = createAction(
  '[Motor] Add to Detail',
  props<{ dish: Motor }>(),
);

///////////////////////////////////////////////////////////////
//getMotorByCategoryId
export const getMotorByCategoryId = createAction(
  '[Motor] get by category id',
  props<{ categoryId: string }>(),
);
export const getMotorByCategoryIdSuccess = createAction(
  '[Motor] get by category id success',
  props<{ motors: Motor[] }>(),
);
export const getMotorByCategoryIdFailure = createAction(
  '[Motor] get by category id failure',
  props<{ getErrMess: any }>(),
);

//////////////////////////////////////////////
//getMotorById
export const getMotorById = createAction(
  '[Motor] get by id',
  props<{ motorId: string }>(),
);
export const getMotorByIdSuccess = createAction(
  '[Motor] get by id success',
  props<{ selectedMotor: Motor }>(),
);
export const getMotorByIdFailure = createAction(
  '[Motor] get by id failure',
  props<{ getErrMess: any }>(),
);

////////////////////////////////
//resetAddSuccess
export const resetAddSuccessMotor = createAction('[Motor] reset add success');
