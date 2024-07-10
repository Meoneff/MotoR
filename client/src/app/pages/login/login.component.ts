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
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoginWithGoogle = false;
  user$ = this.store.select('user', 'user');
  userFirebase: userFirebase = <userFirebase>{};
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
        console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
        this.router.navigate(['/register']);
        if (this.accountData.password != '' && this.accountData.email != '') {
          console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
          if (user.password == this.accountData.password) {
            const userAsJson = JSON.stringify(user);
            sessionStorage.setItem('user', userAsJson);
            console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
            this.router.navigate(['/base/home']);
            this.isGetSuccessUser = false;
            console.log('login with account');
            this.accountData = {
              email: '',
              password: '',
            };
          }
        } else {
          if (this.isLoginWithGoogle && this.userFirebase.email == user.email) {
            console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
            const userAsJsonGG = JSON.stringify(user);
            sessionStorage.setItem('user', userAsJsonGG);
            console.log(sessionStorage);
            this.router.navigate(['/base/home']);
            console.log('login with Google');
            this.isGetSuccessUser = false;
          }
        }
      } else if (
        this.isGetSuccessUser &&
        user.email == '404 user not found' &&
        this.isLoginWithGoogle
      ) {
        console.log(this.userFirebase);
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
    console.log(UserActions.getByEmail);
  }

  loginWithGoogle() {
    this.isLoginWithGoogle = true;
    this.store.dispatch(AuthActions.login());
  }

  register() {
    this.isLoginWithGoogle = false;
    this.router.navigate(['/register']);
  }
}
