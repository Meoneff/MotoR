import { Component } from '@angular/core';
import { ShareModule } from '../../../shared/share.module';
import { TaigaModule } from '../../../shared/taiga.module';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
