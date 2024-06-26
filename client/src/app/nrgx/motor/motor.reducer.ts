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
  selectedMotor: <Motor>{},
  getMotorByCategoryId: false,
  getMotorByCategoryIdSuccess: false,
  getMotorByCategoryIdFailure: '',
  motorGetByCategoryId: [],
  isCreateLoading: false,
  isCreateSuccess: false,
  createErrMess: '',
  motor: <Motor>{},
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updateErrMess: '',
  isDeleteLoading: false,
  isDeleteSuccess: false,
  deleteErrMess: '',
  isUpdateAllStatusTrueLoading: false,
  isUpdateAllStatusTrueSuccess: false,
  updateAllStatusTrueErrMess: '',
  isUpdateAllStatusFalseLoading: false,
  isUpdateAllStatusFalseSuccess: false,
  updateAllStatusFalseErrMess: '',
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
  on(MotorActions.getMotorById, (state, action) => {
    console.log('getMotorbyid');
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
    };
  }),
  on(MotorActions.getMotorByIdSuccess, (state, action) => {
    console.log('GetMotorId');
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      getErrMess: '',
      selectedMotor: action.selectedMotor,
    };
  }),
  on(MotorActions.getMotorByIdFailure, (state, action) => {
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
      motorGetByCategoryId: action.motors,
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
  on(MotorActions.create, (state, action) => {
    return {
      ...state,
      isCreateLoading: true,
      isCreateSuccess: false,
      createErrMess: '',
    };
  }),
  on(MotorActions.createMotorSuccess, (state, action) => {
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: true,
      createErrMess: '',
      motor: action.motor,
    };
  }),
  on(MotorActions.createMotorFailure, (state, action) => {
    return {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: false,
      createErrMess: action.error,
    };
  }),
  on(MotorActions.updateMotor, (state, action) => {
    return {
      ...state,
      isUpdateLoading: true,
      isUpdateSuccess: false,
      updateErrMess: '',
    };
  }),
  on(MotorActions.updateMotorSuccess, (state, action) => {
    return {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: true,
      updateErrMess: '',
    };
  }),
  on(MotorActions.updateMotorFailure, (state, action) => {
    return {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: false,
      updateErrMess: action.error,
    };
  }),
  on(MotorActions.deleteMotor, (state, action) => {
    return {
      ...state,
      isDeleteLoading: true,
      isDeleteSuccess: false,
      deleteErrMess: '',
    };
  }),
  on(MotorActions.deleteMotorSuccess, (state, action) => {
    return {
      ...state,
      isDeleteLoading: false,
      isDeleteSuccess: true,
      deleteErrMess: '',
    };
  }),
  on(MotorActions.deleteMotorFailure, (state, action) => {
    return {
      ...state,
      isDeleteLoading: false,
      isDeleteSuccess: false,
      deleteErrMess: action.error,
    };
  }),
  on(MotorActions.updateAllStatusTrue, (state, action) => {
    return {
      ...state,
      isUpdateStatusAllTrueLoading: true,
      isUpdateStatusAllTrueSuccess: false,
      updateStatusAllTrueErrMess: '',
    };
  }),
  on(MotorActions.updateAllStatusTrueSuccess, (state, action) => {
    return {
      ...state,
      isUpdateAllStatusTrueLoading: false,
      isUpdateAllStatusTrueSuccess: true,
      updateAllStatusTrueErrMess: '',
    };
  }),
  on(MotorActions.updateAllStatusTrueFailure, (state, action) => {
    return {
      ...state,
      isUpdateAllStatusTrueLoading: false,
      isUpdateAllStatusTrueSuccess: false,
      updateAllStatusTrueErrMess: action.error,
    };
  }),
  on(MotorActions.resetUpdateAllStatus, (state, action) => {
    return {
      ...state,
      isUpdateAllStatusTrueSuccess: false,
      isUpdateAllStatusFalseSuccess: false,
      updateAllStatusTrueErrMess: '',
      updateAllStatusFalseErrMess: '',
    };
  }),
);
