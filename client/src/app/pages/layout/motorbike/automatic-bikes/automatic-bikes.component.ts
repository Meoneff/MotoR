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
import { Subscription } from 'rxjs';
import { Reservation } from '../../../../model/reservation.model';
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

  motor$ = this.store.select('motor', 'motorList');

  category$ = this.store.select('category', 'categories');
  manufacturer$ = this.store.select('manufacturer', 'manufacturers');
  motorList: Motor[] = [];
  categories: Category[] = [];
  manufacturers: Manufacturer[] = [];
  subscriptions: Subscription[] = [];
  reservationListByEndDate: Reservation[] = [];
  reservationListByStartDate: Reservation[] = [];
  userToGetReservation: User = <User>{};
  isFirstZeroInEndDate: boolean = false;
  isFirstZeroInStartDate: boolean = false;
  isUpdateStatusMotorOneTime = false;
  reservation_id: string = '';
  selectedDays: number = 1;
  motor_id: string = '';

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
    this.store.dispatch(MotorActions.get());
    this.store.dispatch(CategoryActions.getById({ categoryId: 'A01' }));
    this.store.dispatch(ManufacturerActions.get());
    this.store.dispatch(get());

    //sử dụng để nghe thay đổi và cập nhật dữ liệu
    this.subscriptions.push(
      this.motor$.subscribe((motorList) => {
        if (motorList.length > 0) {
          console.log(motorList);
          this.motorList = motorList;
        }
      }),
      this.category$.subscribe((categories) => {
        this.categories = categories;
      }),
      this.manufacturer$.subscribe((manufacturers) => {
        this.manufacturers = manufacturers;
      }),
    );
  }
  ngOnInit() {
    this.subscriptions.push(
      this.motor$.subscribe((motorList) => {
        if (motorList.length > 0) {
          console.log(motorList);
          this.motorList = motorList;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
