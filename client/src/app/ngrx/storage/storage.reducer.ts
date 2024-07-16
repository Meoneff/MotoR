import { createReducer, on } from '@ngrx/store';
import { StorageState } from './storage.state';
import * as StorageAction from './storage.actions';
import { Storage } from '../../model/storage.model';

export const initualState: StorageState = {
  storage: <Storage>{},
  isCreating: false,
  isCreateSuccess: false,
  isCreateFailure: '',
  isGetting: false,
  isGetSuccess: false,
  getErrorMessage: '',
};
export const storageReducer = createReducer(
  initualState,
  on(StorageAction.create, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreating: true,
      isCreateSuccess: false,
      isCreateFailure: '',
    };
  }),
  on(StorageAction.createSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
      isCreateFailure: '',
    };
  }),
  on(StorageAction.createFailure, (state, { type, errorMessage }) => {
    console.log(type);
    console.log(errorMessage);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      isCreateFailure: errorMessage,
    };
  }),
  on(StorageAction.get, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetting: true,
      isGetSuccess: false,
      getErrorMessage: '',
      storage: <Storage>{},
    };
  }),
  on(StorageAction.getSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isGetting: false,
      isGetSuccess: true,
      getErrorMessage: '',
      storage: action.storage,
    };
  }),
  on(StorageAction.getFailure, (state, { type, errorMessage }) => {
    console.log(type);
    console.log(errorMessage);
    return {
      ...state,
      isGetting: false,
      isGetSuccess: false,
      getErrorMessage: errorMessage,
      storage: <Storage>{},
    };
  }),
);
