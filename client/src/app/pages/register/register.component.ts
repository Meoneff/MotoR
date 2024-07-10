import { Component } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrx/auth/auth.state';
import { UserState } from '../../ngrx/user/user.state';
import { userFirebase } from '../../model/userFirebase.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import * as UserActions from '../../ngrx/user/user.actions';
import { User } from '../../model/user.model';
import { ShareModule } from '../../shared/share.module';
import { TaigaModule } from '../../shared/taiga.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ShareModule, TaigaModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  // Flag to indicate if login is with Google
  isLoginWithGoogle = false;

  // Firebase user object
  userFirebase: userFirebase = <userFirebase>{};

  // Observable for user state
  user$ = this.store.select('user', 'user');

  // Registration form group with validation
  regisForm = new FormGroup({
    _id: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z-0-9]+/g),
    ]),
    //confirmPassword
    confirmPassword: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]+/g),
    ]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
  ) {
    // Listen for authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoginWithGoogle = true;
        this.userFirebase = {
          uid: user.uid,
          picture: user.photoURL || '',
          email: user.email || '',
          name: user.displayName || '',
        };
        // Dispatch action to store Firebase user data
        this.store.dispatch(AuthActions.storageUserFirebase(this.userFirebase));
      }
    });

    // Subscribe to user creation success state
    this.store.select('user', 'isCreateSussess').subscribe((state) => {
      if (state) {
        this.router.navigate(['/base/home']);
      }
    });
  }

  // Method to handle registration click
  registerclick() {
    if (this.isLoginWithGoogle) {
      let regisData: User = {
        _id: '',
        uid: this.userFirebase.uid ?? '',
        name: this.userFirebase.name,
        email: this.userFirebase.email,
        password: this.regisForm.value.password ?? '',
        confirmPassword: this.regisForm.value.confirmPassword ?? '',
        phone: this.regisForm.value.phone ?? '',
        avatar: this.userFirebase.picture,
        role: 'user',
      };
      // Dispatch action to create user with Google data
      this.store.dispatch(UserActions.createUser({ user: regisData }));
      console.log(regisData);
    } else {
      let regisData: User = {
        _id: '',
        uid: this.regisForm.value.name ?? '',
        name: this.regisForm.value.name ?? '',
        email: this.regisForm.value.email ?? '',
        password: this.regisForm.value.password ?? '',
        confirmPassword: this.regisForm.value.confirmPassword ?? '',
        phone: this.regisForm.value.phone ?? '',
        avatar: '',
        role: 'user',
      };
      // Dispatch action to create user with form data
      this.store.dispatch(UserActions.createUser({ user: regisData }));
    }
  }

  // Method to handle login click
  loginclick() {
    this.router.navigate(['/login']);
  }
}
