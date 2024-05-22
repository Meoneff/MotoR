//motor.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Motor } from '../../model/motor.model';
import * as MotorActions from './motor.actions';
import { MotorState } from './motor.state';

export const initialState: MotorState = {
  motorList: [],
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  selectedMotor: [],
  getMotorByCategoryId: false,
  getMotorByCategoryIdSuccess: false,
  getMotorByCategoryIdFailure: '',
  motorGetByCategoryId: [],
};

export const motorReducer = createReducer(
  initialState,
  on(MotorActions.get, (state, action) => {
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
    };
  }),
  on(MotorActions.getSuccess, (state, action) => {
    console.log('123');
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      getErrMess: '',
      motorList: action.motorList,
    };
  }),
  on(MotorActions.getFailure, (state, action) => {
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.getErrMess,
    };
  }),
  on(MotorActions.getMotorByCategoryId, (state, action) => {
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
    };
  }),
  on(MotorActions.getMotorByCategoryIdSuccess, (state, action) => {
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      getErrMess: '',
      motorGetByCategoryId: action.motorList,
    };
  }),
  on(MotorActions.getMotorByCategoryIdFailure, (state, action) => {
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.getErrMess,
    };
  }),
);
