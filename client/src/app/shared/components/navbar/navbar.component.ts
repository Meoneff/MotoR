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
