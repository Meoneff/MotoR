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
  selector: 'app-automatic-bikes',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './automatic-bikes.component.html',
  styleUrls: ['./automatic-bikes.component.scss'],
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
          //coppy lại để sử dụng array
          this.motorList = [...automaticCategories];
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
