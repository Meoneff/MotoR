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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, TaigaModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
