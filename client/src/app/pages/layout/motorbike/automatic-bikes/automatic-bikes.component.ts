import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareModule } from '../../../../shared/share.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MotorState } from '../../../../nrgx/motor/motor.state';
import { AuthState } from '../../../../nrgx/auth/auth.state';
import { UserState } from '../../../../nrgx/user/user.state';
import { categoryState } from '../../../../nrgx/category/category.state';
import { ManufacturerState } from '../../../../nrgx/manufacturer/manufacturer.state';
import { get } from '../../../../nrgx/motor/motor.actions';
import * as MotorActions from '../../../../nrgx/motor/motor.actions';
import * as CategoryActions from '../../../../nrgx/category/category.actions';
import * as ManufacturerActions from '../../../../nrgx/manufacturer/manufacturer.actions';
import { Motor } from '../../../../model/motor.model';
import { Manufacturer } from '../../../../model/manufacturer.model';
import { Category } from '../../../../model/category.model';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../model/user.model';

@Component({
  selector: 'app-automatic-bikes',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './automatic-bikes.component.html',
  styleUrl: './automatic-bikes.component.scss',
})
export class AutomaticBikesComponent implements OnInit, OnDestroy {
  index = 0;

  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');
  user: User = <User>{};

  automatic$ = this.store.select('motor', 'motorGetByCategoryId');

  motor$ = this.store.select('motor', 'motorList');

  category$ = this.store.select('category', 'categories');

  manufacturer$ = this.store.select('manufacturer', 'manufacturers');
  motorList: Motor[] = [];
  categories: Category[] = [];
  automaticCategories: Category[] = [];
  manufacturers: Manufacturer[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<{
      motor: MotorState;
      auth: AuthState;
      user: UserState;
      category: categoryState;
      manufacturer: ManufacturerState;
    }>,
  ) {
    this.store.dispatch(MotorActions.get({ isConfirmed: true }));
    this.store.dispatch(CategoryActions.getById({ categoryId: 'A01' }));
    this.store.dispatch(
      MotorActions.getMotorByCategoryId({
        categoryId: '6625353eaf10759eba05ccf0',
      }),
    );
    this.store.dispatch(ManufacturerActions.get());
    this.store.dispatch(get({ isConfirmed: true }));
  }
  ngOnInit() {
    this.subscriptions.push(
      this.automatic$.subscribe((automaticCategories) => {
        if (automaticCategories.length > 0) {
          console.log(automaticCategories);
          this.motorList = automaticCategories;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
