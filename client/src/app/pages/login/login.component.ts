import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareModule } from '../../shared/share.module';
import { TaigaModule } from '../../shared/taiga.module';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrx/auth/auth.state';
import { UserState } from '../../ngrx/user/user.state';
import { userFirebase } from '../../model/userFirebase.model';
import { onAuthStateChanged } from '@firebase/auth';
import * as UserActions from '../../ngrx/user/user.actions';
import { User } from '../../model/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import * as AuthActions from '../../ngrx/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoginWithGoogle = false;
  isLoginWithAccount = false;

  user$ = this.store.select('user', 'user');
  userFirebase: userFirebase = {} as userFirebase;
  userFirebase$ = this.store.select('auth', 'userFirebase');
  isGetSuccessUser = false;

  accountForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  accountData = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user && user.email) {
        this.isLoginWithGoogle = true;
        this.userFirebase = {
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          picture: user.photoURL || '',
        };
        this.store.dispatch(
          UserActions.getByEmail({ email: user.email || '' }),
        );
      }
    });

    this.user$.subscribe((user) => {
      if (user && user.email) {
        this.isGetSuccessUser = true;

        if (
          this.accountData.password &&
          this.accountData.email &&
          !this.isLoginWithGoogle
        ) {
          if (user.password === this.accountData.password) {
            sessionStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/base/home']);
            this.resetForm();
          }
        } else if (
          this.isLoginWithGoogle &&
          this.userFirebase.email === user.email
        ) {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/base/home']);
          this.isGetSuccessUser = false;
        }
      }

      if (
        this.isGetSuccessUser &&
        user.email === '404 user not found' &&
        this.isLoginWithGoogle
      ) {
        this.router.navigate(['/register']);
      }
    });
  }

  loginWithAccount() {
    this.accountData = {
      email: this.accountForm.value.email || '',
      password: this.accountForm.value.password || '',
    };
    this.store.dispatch(
      UserActions.getByEmail({ email: this.accountData.email }),
    );
  }

  loginWithGoogle() {
    this.isLoginWithGoogle = true;
    this.store.dispatch(AuthActions.login());
  }

  register() {
    this.isLoginWithGoogle = false;
    this.router.navigate(['/register']);
  }

  private resetForm() {
    this.accountData = { email: '', password: '' };
    this.accountForm.reset();
    this.isGetSuccessUser = false;
  }
}
