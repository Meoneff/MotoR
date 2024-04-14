import { createAction, props } from '@ngrx/store';
import { userFirebase } from '../../model/userFirebase.model';

export const login = createAction('[Auth] login');

export const loginSuccess = createAction('[Auth] loginSuccess');

export const loginFailure = createAction(
  '[Auth] loginFailure',
  props<{ error: any }>(),
);

export const logout = createAction('[Auth] logout');

export const logoutSuccess = createAction('[Auth] logoutSuccess');

export const logoutFailure = createAction(
  '[Auth] logoutFailure',
  props<{ error: any }>(),
);

export const storageUserFirebase = createAction(
  '[Auth] stored user firebase',
  (userFirebase: userFirebase) => ({ userFirebase }),
);

export const resetState = createAction('[Auth] reset state');
