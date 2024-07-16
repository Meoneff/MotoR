import { createAction, props } from '@ngrx/store';
import { Storage } from '../../model/storage.model';

export const create = createAction(
  '[Storage] Create',
  props<{ file: File; fileName: string }>(),
);

export const createSuccess = createAction('[Storage] Create Success');

export const createFailure = createAction(
  '[storage] Create Failure',
  props<{ errorMessage: any }>(),
);

export const get = createAction('[storage] Get', props<{ fileName: string }>());

export const getSuccess = createAction(
  '[storage] Get Success',
  props<{ storage: Storage }>(),
);

export const getFailure = createAction(
  '[storage] Get Failure',
  props<{ errorMessage: any }>(),
);
