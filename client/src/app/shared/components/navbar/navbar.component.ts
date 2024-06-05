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
import { combineLatest } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass,
    TaigaModule,
    RouterLink,
    ShareModule,
    NavbarComponent,
    MatIconModule,
  ],
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
    combineLatest({
      route: this.route$,
      user: this.user$,
    }).subscribe((res) => {});
  }

  openAuto = false;
  openInfo = false;
  openSemi = false;
  openManual = false;
  index = 0;

  closeDropdown(dropdown: string): void {
    setTimeout(() => {
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
    }, 150);
  }

  autoClick(): void {
    this.openAuto = false;
  }
  autonaviClick() {
    this.router.navigate(['/automatic/rental']);
  }

  semiClick(): void {
    this.openSemi = false;
  }
  seminaviClick() {
    this.router.navigate(['/semi-auto/rental']);
  }

  manualClick(): void {
    this.openManual = false;
  }
  manualnaviClick() {
    this.router.navigate(['/manual/rental']);
  }

  infoList = [
    { name: 'FAQ', type: 'faq' },
    { name: 'About', type: 'about' },
    { name: 'Contact Us', type: 'contact' },
  ];
  infoClick(): void {
    this.openInfo = false;
  }

  viewAll(type: string): void {
    switch (type) {
      case 'auto':
        this.autoClick();
        break;
      case 'semi':
        this.semiClick();
        break;
      case 'manual':
        this.manualClick();
        break;
      default:
        break;
    }
  }

  hondaLead() {
    this.router.navigateByUrl('/detail/664a360da6dc163dc2421385');
  }
  hondaVision() {
    this.router.navigateByUrl('/detail/664a34dbde98ef26556e56be');
  }
  hondaAirBlade() {
    this.router.navigateByUrl('/detail/664a3679a6dc163dc242138b');
  }
  yamahaNouvo() {
    this.router.navigateByUrl('/detail/664a3b3251d699691926e35e');
  }
  yamahaMio() {
    this.router.navigateByUrl('/detail/664a36e6a6dc163dc242138d');
  }
  hondaWaveAlpha() {
    this.router.navigateByUrl('/detail/664b307aa1ed0bcf37970687');
  }
  hondaWaveBlade() {
    this.router.navigateByUrl('/detail/664b310aa1ed0bcf3797068d');
  }
  hondaRSX() {
    this.router.navigateByUrl('/detail/664b3428a1ed0bcf3797068f');
  }
  hondaFuture() {
    this.router.navigateByUrl('/detail/664b35e6a1ed0bcf37970695');
  }
  hondaWinner() {
    this.router.navigateByUrl('/detail/664b3678a1ed0bcf3797069a');
  }
  hondaXR() {
    this.router.navigateByUrl('/detail/664b36b2a1ed0bcf3797069c');
  }
  hondaCRF() {
    this.router.navigateByUrl('/detail/664b3754a1ed0bcf379706a2');
  }
  hondaCB() {
    this.router.navigateByUrl('/detail/664b3834a1ed0bcf379706a6');
  }
  hondaRE() {
    this.router.navigateByUrl('/detail/664b3954a1ed0bcf379706ad');
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
