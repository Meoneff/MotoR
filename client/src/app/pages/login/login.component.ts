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
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../nrgx/auth/auth.state';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TaigaModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(
    @Inject(TUI_IS_E2E) readonly isE2E: boolean,
    private AuthService: AuthService,
    private router: Router,
  ) {}
  async login() {
    let loginResult = await this.AuthService.loginWithGoogle();
    if (loginResult == null) {
      console.log('Failed');
    } else {
      console.log('Succes');
      this.router.navigate(['/']);
    }
  }
}
