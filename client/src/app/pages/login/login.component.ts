import { TaigaModule } from '../../shared/taiga.module';
import { NgOptimizedImage } from '@angular/common';
import { User } from '../../model/user.model';
import { Component } from '@angular/core';
import * as AuthActions from '../../nrgx/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from '../../nrgx/auth/auth.state';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserState } from '../../nrgx/user/user.state';
import * as UserActions from '../../nrgx/user/user.actions';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { userFirebase } from '../../model/userFirebase.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TaigaModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  isLoginWithGoogle = false;
  user$ = this.store.select('user', 'user');
  userFirebase: userFirebase = <userFirebase>{};
  userFirebase$ = this.store.select('auth', 'userFirebase');
  isGetSuccessUser = false;

  constructor(
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
    private router: Router,
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
            const userAsJsoBth = JSON.stringify(user);
            sessionStorage.setItem('user', userAsJsoBth);
            console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
            this.router.navigate(['/base/home']);
            this.isGetSuccessUser = false;
            console.log('login w account');
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
            console.log('login w gg');
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
    // onAuthStateChanged(this.auth, (user) => {
    //   console.log(user);

    //   if (user && user.email != undefined && user.email != '') {
    //     this.isLoginWithGoogle = true;
    //     this.userFirebase = {
    //       uid: user.uid,
    //       email: user.email || '',
    //       name: user.displayName || '',
    //       picture: user.photoURL || '',
    //     };
    //     this.store.dispatch(
    //       UserActions.getByEmail({ email: user.email || '' }),
    //     );
    //   }
    // });

    // this.user$.subscribe((user) => {
    //   if (
    //     user != <User>{} &&
    //     user != undefined &&
    //     user != null &&
    //     user.email != undefined
    //   ) {
    //     this.isGetSuccessUser = true;
    //     console.log('có User: ' + user.email);
    //     console.log(this.accountData);
    //     console.log(this.userFirebase);
    //     console.log(this.isLoginWithGoogle);

    //     console.log('isGetSuccessUser: ' + this.isGetSuccessUser);

    //     if (
    //       this.accountData.password != '' &&
    //       this.accountData.email != '' &&
    //       !this.isLoginWithGoogle
    //     ) {
    //       console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
    //       console.log('có tài khoản k phải tk gg');
    //       if (user.password == this.accountData.password) {
    //         const userAsJsoBth = JSON.stringify(user);
    //         sessionStorage.setItem('user', userAsJsoBth);
    //         console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
    //         this.router.navigate(['/home']);
    //         this.isGetSuccessUser = false;
    //         console.log('đăng nhập với tk thường');
    //         this.accountData = {
    //           email: '',
    //           password: '',
    //         };
    //       }
    //     } else {
    //       if (this.isLoginWithGoogle && this.userFirebase.email == user.email) {
    //         console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
    //         const userAsJsonGG = JSON.stringify(user);
    //         sessionStorage.setItem('user', userAsJsonGG);

    //         this.router.navigate(['/home']);
    //         console.log('đăng nhập với gg');
    //         this.isGetSuccessUser = false;
    //       }
    //     }
    //   }
    //   if (
    //     this.isGetSuccessUser &&
    //     user.email == '404 user not found' &&
    //     this.isLoginWithGoogle
    //   ) {
    //     console.log(this.userFirebase);
    //     this.router.navigate(['/home']);
    //   }
    // });
  }

  accountForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  accountData = {
    email: '',
    password: '',
  };

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
    console.log(this.isLoginWithGoogle);
  }
}
