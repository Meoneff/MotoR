import { createAction, props } from '@ngrx/store';
import { Category } from '../../model/category.model';

export const get = createAction('[category] Get');

export const getSuccess = createAction(
  '[category] Get Success',
  props<{ categories: Category[] }>(),
);

export const getFailure = createAction(
  '[category] Get Failure',
  props<{ errorMessage: string }>(),
);

export const getById = createAction(
  '[category] Get By caterogyId',
  props<{ categoryId: string }>(),
);

export const getByIdSuccess = createAction(
  '[category] Get By Id Success',
  props<{ category: Category }>(),
);

export const getByIdFailure = createAction(
  '[category] Get By Id Failure',
  props<{ errorMessage: string }>(),
);
