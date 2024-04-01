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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, TaigaModule, RouterLink, ShareModule, NavbarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(private router: Router) {}

  readonly testForm = new FormGroup({
    option: new FormControl(false),
  });

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

  autoClick(): void {
    this.openAuto = false;
    this.index = 1;
  }

  semiClick(): void {
    this.openSemi = false;
    this.index = 1;
  }
  manualClick(): void {
    this.openManual = false;
    this.index = 1;
  }
  infoClick(): void {
    this.openInfo = false;
    this.index = 1;
  }
  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
  });

  login() {
    this.router.navigateByUrl('/login');
  }
}
