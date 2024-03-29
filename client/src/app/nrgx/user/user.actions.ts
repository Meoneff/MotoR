import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user.model';

export const getByEmail = createAction(
  '[User] Get User',
  props<{ email: string }>(),
);

export const getByEmailSuccess = createAction(
  '[User] Get User Success',
  props<{ user: User }>(),
);

export const getByEmailFailure = createAction(
  '[User] Get User Failure',
  props<{ error: any }>(),
);

export const createUser = createAction(
  '[User] Create User',
  props<{ user: User }>(),
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: User }>(),
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: any }>(),
);

export const storedUser = createAction('[User] Stored User', (user: User) => ({
  user,
}));

export const resetUser = createAction('[User] Reset User');
