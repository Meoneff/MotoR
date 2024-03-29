import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/auth.actions';
import { AuthService } from '../../service/auth/auth.service';

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
      catchError((error) =>
        of(AuthActions.loginFailure({ errorMessage: error })),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return this.authService.logout();
      }),
      map(() => AuthActions.logoutSuccess()),
      catchError((error) =>
        of(AuthActions.logoutFailure({ errorMessage: error })),
      ),
    ),
  );
}
