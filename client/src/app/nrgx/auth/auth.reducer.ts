import { userFirebase } from '../../model/userFirebase.model';
import * as AuthActions from '../auth/auth.actions';
import { AuthState } from '../auth/auth.state';
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
  on(AuthActions.login, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: true,
      isSuccessful: false,
      errorMessage: '',
    };
    return newState;
  }),

  on(AuthActions.loginSuccess, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: false,
      isSuccessful: true,
      errorMessage: '',
    };
    return newState;
  }),

  on(AuthActions.loginFailure, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: false,
      isSuccessful: false,
      errorMessage: action.error,
    };
    return newState;
  }),

  on(AuthActions.logout, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: true,
      isLogoutSuccess: false,
      errorMessage: '',
    };
    return newState;
  }),

  on(AuthActions.logoutSuccess, (state, action) => {
    console.log('logout success');

    let newState: AuthState = {
      ...state,
      isLoading: false,
      isLogoutSuccess: true,
      errorMessage: '',
    };
    return newState;
  }),

  on(AuthActions.logoutFailure, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: false,
      isLogoutSuccess: false,
      errorMessage: action.error,
    };
    return newState;
  }),
  on(AuthActions.storageUserFirebase, (state, { userFirebase, type }) => {
    console.log(type);
    return {
      ...state,
      userFirebase,
    };
  }),
  on(AuthActions.resetState, (state, action) => {
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
