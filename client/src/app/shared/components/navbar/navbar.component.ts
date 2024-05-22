import {
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TaigaModule } from '../../taiga.module';
import { TuiDialogService } from '@taiga-ui/core';
import { ShareModule } from '../../share.module';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../nrgx/auth/auth.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../../nrgx/auth/auth.actions';
import * as UserAction from '../../../nrgx/user/user.actions';
import { UserState } from '../../../nrgx/user/user.state';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, TaigaModule, RouterLink, ShareModule, NavbarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  user: User = <User>{};
  route$ = this.router.events;
  user$ = this.store.select('user', 'user');
  auth$ = this.store.select('auth', 'isLogoutSuccess');

  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
  });
  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState; user: UserState }>,
  ) {
    this.user$.subscribe((user) => {
      if (user && user._id != null && user._id != undefined) {
        console.log(user);
        this.user = user;
      } else {
        this.user = {
          _id: '',
          uid: '',
          avatar: '',
          email: '',
          name: '',
          role: '',
          password: '',
          confirmPassword: '',
          phone: '',
          gender: '',
          // dateOfBirth: '',
        };
      }
    });

    this.store.select('user').subscribe((user) => {
      if (user != null && user != undefined) {
        this.userForm.controls.avatar.setValue(user.user.avatar);
        this.userForm.controls.email.setValue(user.user.email);
        this.userForm.controls.name.setValue(user.user.name);
        this.userForm.controls.uid.setValue(user.user.uid);
      }
    });

    this.auth$.subscribe((res) => {
      if (res) {
        console.log(res);
        sessionStorage.clear();
        this.router.navigate(['/login']);
        this.store.dispatch(AuthActions.resetState());
        this.store.dispatch(UserAction.resetUser());
      }
    });
  }

  openAuto = false;
  openInfo = false;
  openSemi = false;
  openManual = false;
  index = 0;

  closeDropdown(dropdown: string): void {
    switch (dropdown) {
      case 'auto':
        this.openAuto = false;
        break;
      case 'semi':
        this.openSemi = false;
        break;
      case 'manual':
        this.openManual = false;
        break;
      case 'info':
        this.openInfo = false;
        break;
      default:
        break;
    }
  }
  autoMotorcycles = [
    'Honda Lead',
    'Honda Vision',
    'Honda Air blade',
    'Yamaha Nouvo',
    'Yamaha Mio',
    'View All',
  ];
  autoClick(): void {
    this.openAuto = false;
    this.index = 1;
  }
  semiMotorcycles = [
    'Honda Cub',
    'Honda Wave Alpha',
    'Honda Wave Blade',
    'Honda RSX',
    'Honda Future',
    'View All',
  ];
  semiClick(): void {
    this.openSemi = false;
    this.index = 1;
  }
  manualMotorcycles = [
    'Honda Winner 150',
    'Honda XR 150',
    'Honda CRF 300',
    'Honda CB 500X',
    'RE Himalayan 400',
    'View All',
  ];
  manualClick(): void {
    this.openManual = false;
    this.index = 1;
  }
  infoList = [
    { name: 'FAQ', type: 'faq' },
    { name: 'About', type: 'about' },
    { name: 'Contact Us', type: 'contact' },
  ];
  infoClick(): void {
    this.openInfo = false;
    this.index = 1;
  }

  login() {
    this.router.navigateByUrl('/login');
  }
  logout() {
    this.store.dispatch(AuthActions.logout());
  }
  home() {
    this.router.navigate(['/home']);
  }
}
