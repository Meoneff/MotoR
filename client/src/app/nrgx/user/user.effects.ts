import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user/user.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as UserActions from './user.actions';
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
