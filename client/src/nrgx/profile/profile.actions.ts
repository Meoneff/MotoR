import { createAction, props } from '@ngrx/store';
import { Profile } from '../../../src/app/model/profile.model';

export const create = createAction(
  '[Profile] Create ',
  props<{ idToken: string; profile: Profile }>(),
);

export const createSuccess = createAction('[Profile] Create Success');

export const createFailure = createAction(
  '[Profile] Create Failure',
  props<{ errorMessage: any }>(),
);

export const get = createAction(
  '[Profile] Get',
  props<{ id: string; idToken: string }>(),
);

export const getSuccess = createAction(
  '[Profile] Get Success',
  props<{ profile: Profile }>(),
);

export const getFailure = createAction(
  '[Profile] Get Failure',
  props<{ errorMessage: any }>(),
);

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ idToken: string; profile: Profile }>(),
);

export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success',
  props<{ profile: Profile }>(),
);

export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ errorMessage: any }>(),
);

export const clearState = createAction('[Profile] Clear State');
