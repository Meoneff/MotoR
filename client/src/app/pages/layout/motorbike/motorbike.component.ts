import { Component, OnDestroy } from '@angular/core';
import { User } from '../../../model/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { Motor } from '../../../model/motor.model';
import { Category } from '../../../model/category.model';
import { Manufacturer } from '../../../model/manufacturer.model';
import { Subscription } from 'rxjs';
import { MotorState } from '../../../nrgx/motor/motor.state';
import { AuthState } from '../../../nrgx/auth/auth.state';
import { UserState } from '../../../nrgx/user/user.state';
import { categoryState } from '../../../nrgx/category/category.state';
import { ManufacturerState } from '../../../nrgx/manufacturer/manufacturer.state';
import { Reservation } from '../../../model/reservation.model';
import { get } from '../../../nrgx/motor/motor.actions';
import * as MotorActions from '../../../nrgx/motor/motor.actions';
import * as CategoryActions from '../../../nrgx/category/category.actions';
import * as ManufacturerActions from '../../../nrgx/manufacturer/manufacturer.actions';
@Component({
  selector: 'app-motorbike',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './motorbike.component.html',
  styleUrl: './motorbike.component.scss',
})
export class MotorbikeComponent implements OnDestroy {
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
    this.store.dispatch(CategoryActions.get());
    this.store.dispatch(ManufacturerActions.get());
    this.store.dispatch(get());
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
