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
