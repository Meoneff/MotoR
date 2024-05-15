import { userFirebase } from '../../model/userFirebase.model';
import * as LoginActions from './auth.actions';
import { AuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';

export const initialState: AuthState = {
  userFirebase: <userFirebase>{},
  isLoading: false,
  isSuccessful: false,
  errorMessage: '',
  isLogoutSuccess: false,
};

export const authReducer = createReducer(
  initialState,
  on(LoginActions.login, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: true,
      isSuccessful: false,
      errorMessage: '',
    };
    return newState;
  }),

  on(LoginActions.loginSuccess, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: false,
      isSuccessful: true,
      errorMessage: '',
    };
    return newState;
  }),

  on(LoginActions.loginFailure, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: false,
      isSuccessful: false,
      errorMessage: action.error,
    };
    return newState;
  }),

  on(LoginActions.logout, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: true,
      isLogoutSuccess: false,
      errorMessage: '',
    };
    return newState;
  }),

  on(LoginActions.logoutSuccess, (state, action) => {
    console.log('logout success');

    let newState: AuthState = {
      ...state,
      isLoading: false,
      isLogoutSuccess: true,
      errorMessage: '',
    };
    return newState;
  }),

  on(LoginActions.logoutFailure, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: false,
      isLogoutSuccess: false,
      errorMessage: action.error,
    };
    return newState;
  }),
  on(LoginActions.storageUserFirebase, (state, { userFirebase, type }) => {
    console.log(type);
    return {
      ...state,
      userFirebase,
    };
  }),
  on(LoginActions.resetState, (state, action) => {
    let newState: AuthState = {
      ...state,
      userFirebase: <userFirebase>{},
      isLoading: false,
      isSuccessful: false,
      errorMessage: '',
      isLogoutSuccess: false,
    };
    return newState;
  }),
);
