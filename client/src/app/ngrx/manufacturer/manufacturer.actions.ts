import { createAction, props } from '@ngrx/store';
import { Manufacturer } from '../../model/manufacturer.model';

export const get = createAction('[manufacturer] Get');

export const getSuccess = createAction(
  '[manufacturer] Get Success',
  props<{ manufacturers: Manufacturer[] }>(),
);

export const getFailure = createAction(
  '[manufacturer] Get Failure',
  props<{ errorMessage: string }>(),
);

export const getById = createAction(
  '[manufaturer] Get By manufacturerId',
  props<{ manufacturerId: string }>(),
);

export const getByIdSuccess = createAction(
  '[manufaturer] Get By Id Success',
  props<{ manufaturer: Manufacturer }>(),
);

export const getByIdFailure = createAction(
  '[manufaturer] Get By Id Failure',
  props<{ errorMessage: string }>(),
);
