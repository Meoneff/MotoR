import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareModule } from '../../../../shared/share.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MotorState } from '../../../../ngrx/motor/motor.state';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { UserState } from '../../../../ngrx/user/user.state';
import { categoryState } from '../../../../ngrx/category/category.state';
import { ManufacturerState } from '../../../../ngrx/manufacturer/manufacturer.state';
import { get } from '../../../../ngrx/motor/motor.actions';
import * as MotorActions from '../../../../ngrx/motor/motor.actions';
import * as CategoryActions from '../../../../ngrx/category/category.actions';
import * as ManufacturerActions from '../../../../ngrx/manufacturer/manufacturer.actions';
import { Motor } from '../../../../model/motor.model';
import { Manufacturer } from '../../../../model/manufacturer.model';
import { Category } from '../../../../model/category.model';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../model/user.model';
import { MotorService } from '../../../../service/motor/motor.service';

@Component({
  selector: 'app-manual-bikes',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './manual-bikes.component.html',
  styleUrl: './manual-bikes.component.scss',
})
export class ManualBikesComponent implements OnInit, OnDestroy {
  index = 0;

  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');
  user: User = <User>{};

  manual$ = this.store.select('motor', 'motorGetByCategoryId');

  motor$ = this.store.select('motor', 'motorList');

  category$ = this.store.select('category', 'categories');

  manufacturer$ = this.store.select('manufacturer', 'manufacturers');
  motorList: Motor[] = [];
  categories: Category[] = [];
  manualCategories: Category[] = [];
  manufacturers: Manufacturer[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private motorService: MotorService,
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
    this.store.dispatch(CategoryActions.getById({ categoryId: 'M01' }));
    this.store.dispatch(
      MotorActions.getMotorByCategoryId({
        categoryId: '6625358faf10759eba05ccf4',
      }),
    );
    this.store.dispatch(ManufacturerActions.get());
    this.store.dispatch(get({ isConfirmed: true }));
  }
  ngOnInit() {
    this.subscriptions.push(
      this.manual$.subscribe((manualCategories) => {
        if (manualCategories.length > 0) {
          console.log(manualCategories);
          this.motorList = [...manualCategories];
        }
      }),
    );
  }

  detail(motorDetail: Motor, id: string) {
    this.motorService.addToMotorDetail(motorDetail);
    this.store.dispatch(MotorActions.getMotorById({ motorId: id }));
    this.router.navigate([`/detail/${id}`]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  sortMotorList(event: any) {
    const sortBy = event.target.value;
    this.motorList = [...this.motorList]; // Create a copy of the array before sorting
    this.motorList.sort((a, b) => {
      switch (sortBy) {
        case 'priceHigh':
          return b.price - a.price;
        case 'priceLow':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }
}
