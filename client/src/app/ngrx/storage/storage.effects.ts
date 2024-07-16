import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StorageService } from '../../service/storage/storage.service';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import * as StorageAction from './storage.actions';

@Injectable()
export class StorageEffects {
  constructor(
    private action$: Actions,
    private storageService: StorageService,
  ) {}

  create$ = createEffect(() =>
    this.action$.pipe(
      ofType(StorageAction.create),
      switchMap((action) => {
        return this.storageService.create(action.file, action.fileName);
      }),
      map(() => {
        return StorageAction.createSuccess();
      }),
      catchError((error) => {
        return of(StorageAction.createFailure({ errorMessage: error }));
      }),
    ),
  );

  get$ = createEffect(() =>
    this.action$.pipe(
      ofType(StorageAction.get),
      exhaustMap((action) =>
        this.storageService.getStorage(action.fileName).pipe(
          map((storage) => {
            return StorageAction.getSuccess({ storage: storage });
          }),
          catchError((error) =>
            of(StorageAction.getFailure({ errorMessage: error })),
          ),
        ),
      ),
    ),
  );
}
