import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { TaigaModule } from '../../shared/taiga.module';
import { ShareModule } from '../../shared/share.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TaigaModule, ShareModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
