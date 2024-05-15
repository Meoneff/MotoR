import { Component } from '@angular/core';
import { User } from '../../../model/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { Motor } from '../../../model/motor.model';
import { Category } from '../../../model/category.model';

@Component({
  selector: 'app-motorbike',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './motorbike.component.html',
  styleUrl: './motorbike.component.scss',
})
export class MotorbikeComponent {
  index = 0;

  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('auth', 'user', 'user');
  user: User = <User>{};

  motor$ = this.store.select('motor', 'motorList');
  category$ = this.store.select('category', 'categories');

  motorList: Motor[] = [];
  categories: Category[] = [];
}
