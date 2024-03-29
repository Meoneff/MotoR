// import { Component, Inject } from '@angular/core';
// import { Auth, onAuthStateChanged } from '@angular/fire/auth';
// import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { AuthState } from '../../nrgx/auth/auth.state';
// import { UserState } from '../../nrgx/user/user.state';
// import * as AuthAcitons from '../../nrgx/auth/auth.actions';
// import * as UserActions from '../../nrgx/user/user.actions';
// import { UserFirebase } from '../../model/userFirebase.model';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { User } from '../../model/user.model';
// import { Subscription } from 'rxjs';
// import { TuiAlertService } from '@taiga-ui/core';
// import { Role } from '../../../app/model/role.model';
// import { TaigaModule } from '../../shared/taiga.module';
// import { ShareModule } from '../../shared/share.module';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [TaigaModule, ShareModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss'],
// })
// export class RegisterComponent {
//   readonly genders = ['Male', 'Female'];
//   readonly countries = [
//     'VietNam',
//     'Japan',
//     'Korea',
//     'China',
//     'USA',
//     'UK',
//     'Germany',
//     'Italian',
//     'France',
//     'Spain',
//     'Portugal',
//     'Brazil',
//     'Holland',
//   ];

//   idToken = '';
//   subscriptions: Subscription[] = [];

//   userFirebase: UserFirebase = <UserFirebase>{};
//   user$ = this.store.select('user', 'user');
//   isLoginWithGoogle = false;

//   regisForm = new FormGroup({
//     id: new FormControl('', Validators.required),
//     uid: new FormControl('', Validators.required),
//     avatar: new FormControl('', Validators.required),
//     email: new FormControl('', Validators.required),
//     name: new FormControl('', [
//       Validators.required,
//       Validators.pattern(/[a-zA-Z-0-9]+/g),
//     ]),
//     address: new FormControl('', Validators.required),
//     phone: new FormControl('', [
//       Validators.required,
//       Validators.pattern(/[0-9]+/g),
//     ]),
//     password: new FormControl('', Validators.required),
//     country: new FormControl('', Validators.required),
//     gender: new FormControl('', Validators.required),
//   });

//   constructor(
//     private auth: Auth,
//     private store: Store<{ auth: AuthState; user: UserState }>,
//     private router: Router,
//     @Inject(TuiAlertService)
//     private readonly alerts: TuiAlertService,
//   ) {
//     onAuthStateChanged(this.auth, (user) => {
//       if (user) {
//         this.isLoginWithGoogle = true;
//         this.userFirebase = {
//           uid: user.uid,
//           email: user.email || '',
//           name: user.displayName || '',
//           picture: user.photoURL || '',
//         };
//         this.store.dispatch(AuthAcitons.storedUserFirebase(this.userFirebase));
//       }
//     });
//     this.store.select('user', 'isCreateSussess').subscribe((state) => {
//       if (state) {
//         this.router.navigate(['/login']);
//       }
//     });
//   }

//   register() {
//     if (this.isLoginWithGoogle) {
//       let regisData: User = {
//         uid: this.userFirebase.uid,
//         id: '',
//         avatar: this.userFirebase.picture,
//         email: this.userFirebase.email,
//         name: this.userFirebase.name,
//         address: this.regisForm.value.address ?? '',
//         phone: this.regisForm.value.phone ?? '',
//         password: this.regisForm.value.password ?? '',
//         role: 'user',
//       };
//       this.store.dispatch(UserActions.createUser({ user: regisData }));
//       console.log(regisData);
//     } else {
//       let regisData: User = {
//         uid: this.regisForm.value.phone ?? '',
//         id: '',
//         avatar:
//           'https://ikay.vn/upload_images/images/2023/12/16/Nguyen-Van-Khai-CEO-cua-Ikay-Group.jpg',
//         email: this.regisForm.value.email ?? '',
//         name: this.regisForm.value.name ?? '',
//         address: this.regisForm.value.address ?? '',
//         phone: this.regisForm.value.phone ?? '',
//         password: this.regisForm.value.password ?? '',
//         role: 'user',
//       };
//       this.store.dispatch(UserActions.createUser({ user: regisData }));
//       console.log(regisData);
//     }
//   }

//   back() {
//     this.router.navigate(['/login']);
//   }
// }
