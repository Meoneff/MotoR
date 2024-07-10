import * as ManufacturerActions from './manufacturer.actions';
import { createReducer, on } from '@ngrx/store';
import { ManufacturerState } from './manufacturer.state';

export const initialState: ManufacturerState = {
  manufacturers: [],
  isGetting: false,
  isGetSuccess: false,
  getErrorMessage: '',
};

export const manufacturerReducer = createReducer(
  initialState,
  on(ManufacturerActions.get, (state, action) => {
    let newState: ManufacturerState = {
      ...state,
      isGetting: true,
      isGetSuccess: false,
      getErrorMessage: '',
    };
    return newState;
  }),
  on(ManufacturerActions.getSuccess, (state, action) => {
    let newState: ManufacturerState = {
      ...state,
      isGetting: false,
      isGetSuccess: true,
      manufacturers: action.manufacturers,
    };
    return newState;
  }),
  on(ManufacturerActions.getFailure, (state, action) => {
    let newState: ManufacturerState = {
      ...state,
      isGetting: false,
      isGetSuccess: false,
      getErrorMessage: action.errorMessage,
    };
    return newState;
  }),
);
