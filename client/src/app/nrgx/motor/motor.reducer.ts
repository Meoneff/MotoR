//motor.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Motor } from '../../model/motor.model';
import * as MotorActions from './motor.actions';
import { MotorState } from './motor.state';

export const initialState: MotorState = {
  motors: [],
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  selectedMotor: [],
};

export const MotorReducer = createReducer(
  initialState,
  on(MotorActions.get, (state, action) => ({
    ...state,
    isGetLoading: true,
    isGetSuccess: false,
    getErrMess: '',
  })),
  on(MotorActions.getSuccess, (state, action) => ({
    ...state,
    isGetLoading: false,
    isGetSuccess: true,
    motor: action.motorList,
  })),
  on(MotorActions.getFailure, (state, action) => ({
    ...state,
    isGetLoading: false,
    isGetSuccess: false,
    getErrMess: action.getErrMess,
  })),
);
