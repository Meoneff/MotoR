import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../service/auth/auth.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<{}>,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => {
        return this.authService.loginWithGoogle();
      }),
      map(() => AuthActions.loginSuccess()),
      catchError((error) => of(AuthActions.loginFailure({ error: error }))),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return this.authService.logout();
      }),
      map(() => AuthActions.logoutSuccess()),
      catchError((error) => of(AuthActions.logoutFailure({ error: error }))),
    ),
  );
}
