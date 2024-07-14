import { Component } from '@angular/core';
import { ShareModule } from '../../../shared/share.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ShareModule, TaigaModule, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  user: User = <User>{};
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }
}
