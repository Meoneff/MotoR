import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { TaigaModule } from '../../shared/taiga.module';
import { NgOptimizedImage } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { TUI_IS_E2E } from '@taiga-ui/cdk';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TaigaModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(@Inject(TUI_IS_E2E) readonly isE2E: boolean) {}

  // isLoginWithGoogle = false;
  // user$ = this.store.select('user', 'user');
  // userFirebase: UserFirebase = <UserFirebase>{};
  // userFirebase$ = this.store.select('auth', 'userFirebase');
  // isGetSuccessUser = false;
  // constructor(
  //   private auth: Auth,
  //   private store: Store<{ auth: AuthState; user: UserState }>,
  //   private router: Router,
  // ) {
  //   onAuthStateChanged(this.auth, (user) => {
  //     console.log(user);
  //     if (user && user.email != undefined && user.email != '') {
  //       this.isLoginWithGoogle = true;
  //       this.userFirebase = {
  //         uid: user.uid,
  //         email: user.email || '',
  //         name: user.displayName || '',
  //         picture: user.photoURL || '',
  //       };
  //       this.store.dispatch(
  //         UserActions.getByEmail({ email: user.email || '' }),
  //       );
  //     }
  //   });
  //   this.user$.subscribe((user) => {
  //     if (
  //       user != <User>{} &&
  //       user != undefined &&
  //       user != null &&
  //       user.email != undefined
  //     ) {
  //       this.isGetSuccessUser = true;
  //       console.log('có User: ' + user.email);
  //       console.log(this.accountData);
  //       console.log(this.userFirebase);
  //       console.log(this.isLoginWithGoogle);
  //       console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
  //       if (
  //         this.accountData.password != '' &&
  //         this.accountData.email != '' &&
  //         !this.isLoginWithGoogle
  //       ) {
  //         console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
  //         console.log('có tài khoản k phải tk gg');
  //         if (user.password == this.accountData.password) {
  //           const userAsJsoBth = JSON.stringify(user);
  //           sessionStorage.setItem('user', userAsJsoBth);
  //           console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
  //           this.router.navigate(['/base/home']);
  //           this.isGetSuccessUser = false;
  //           console.log('đăng nhập với tk thường');
  //           this.accountData = {
  //             email: '',
  //             password: '',
  //           };
  //         }
  //       } else {
  //         if (this.isLoginWithGoogle && this.userFirebase.email == user.email) {
  //           console.log('isGetSuccessUser: ' + this.isGetSuccessUser);
  //           const userAsJsonGG = JSON.stringify(user);
  //           sessionStorage.setItem('user', userAsJsonGG);
  //           this.router.navigate(['/base/home']);
  //           console.log('đăng nhập với gg');
  //           this.isGetSuccessUser = false;
  //         }
  //       }
  //     }
  //     if (
  //       this.isGetSuccessUser &&
  //       user.email == '404 user not found' &&
  //       this.isLoginWithGoogle
  //     ) {
  //       console.log(this.userFirebase);
  //       this.router.navigate(['/register']);
  //     }
  //   });
  // }
  // accountForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });
  // accountData = {
  //   email: '',
  //   password: '',
  // };
  // loginWithAccount() {
  //   this.accountData = {
  //     email: this.accountForm.value.email || '',
  //     password: this.accountForm.value.password || '',
  //   };
  //   this.store.dispatch(
  //     UserActions.getByEmail({ email: this.accountData.email }),
  //   );
  // }
  // loginWithGoogle() {
  //   this.isLoginWithGoogle = true;
  //   this.store.dispatch(AuthAcitons.login());
  // }
  // register() {
  //   this.isLoginWithGoogle = false;
  //   this.router.navigate(['/register']);
  //   console.log(this.isLoginWithGoogle);
  // }
}
