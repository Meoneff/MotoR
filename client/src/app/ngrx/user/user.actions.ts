import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user.model';

export const getUserId = createAction(
  '[User] Get User ID',
  props<{ userId: string }>(),
);

export const getByEmail = createAction(
  '[User] get by email',
  props<{ email: string }>(),
);

export const getByEmailSuccess = createAction(
  '[User] get by email success',
  props<{ user: User }>(),
);

export const getByEmailFailure = createAction(
  '[User] get by email failure',
  props<{ error: any }>(),
);

export const createUser = createAction(
  '[User] create user',
  props<{ user: User }>(),
);

export const createUserSuccess = createAction(
  '[User] create user success',
  props<{ user: User }>(),
);

export const createUserFailure = createAction(
  '[User] create user failure',
  props<{ error: any }>(),
);

export const storedUser = createAction('[User] Stored User', (user: User) => ({
  user,
}));

export const resetUser = createAction('[User] Reset User');
