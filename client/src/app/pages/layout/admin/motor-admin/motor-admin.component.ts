import { Component } from '@angular/core';
import { ShareModule } from '../../../../shared/share.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-motor-admin',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './motor-admin.component.html',
  styleUrl: './motor-admin.component.scss',
})
export class MotorAdminComponent {
  motorForm = new FormGroup({
    motorId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });
  constructor(private router: Router) {}
}
