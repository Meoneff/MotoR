import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as UserActions from '../../nrgx/user/user.actions';
import { UserService } from '../../service/user/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  getUserByEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getByEmail),
      mergeMap((action) =>
        this.userService.getUserByEmail(action.email).pipe(
          map((user) => UserActions.getByEmailSuccess({ user: user })),
          catchError((error) => of(UserActions.getByEmailFailure({ error }))),
        ),
      ),
    ),
  );
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((user) => UserActions.createUserSuccess({ user: user })),
          catchError((error) => of(UserActions.createUserFailure({ error }))),
        ),
      ),
    ),
  );
}
