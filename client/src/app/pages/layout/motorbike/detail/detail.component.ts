import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ShareModule } from '../../../../shared/share.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { MotorState } from '../../../../nrgx/motor/motor.state';
import { AuthState } from '../../../../nrgx/auth/auth.state';
import { UserState } from '../../../../nrgx/user/user.state';
import { ReservationState } from '../../../../nrgx/reservation/reservation.state';
import { PaymentState } from '../../../../nrgx/payment/payment.state';
import { Motor } from '../../../../model/motor.model';
import { User } from '../../../../model/user.model';
import { Reservation } from '../../../../model/reservation.model';
import * as ReservationActions from '../../../../nrgx/reservation/reservation.actions';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  activeTabIndex: number = 0;

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }

  city = ['Thành phố Hồ Chí Minh', 'Hà Nội'];

  chooseCity = new FormControl();

  // motorcycleForm = new FormGroup({
  //   numberOfMotorcycles: new FormControl(),
  //   startDate: new FormControl(),
  //   endDate: new FormControl(),
  // });
  user$ = this.store.select('user', 'user');
  userFirebase$ = this.store.select('auth', 'userFirebase');
  isCreateReservationSuccess$ = this.store.select(
    'reservation',
    'isCreateSuccess',
  );
  reservationListByEndDate$ = this.store.select(
    'reservation',
    'reservationListByEndDate',
  );
  reservationListByStartDate$ = this.store.select(
    'reservation',
    'reservationListByStartDate',
  );
  // isUpdateAllStatusTrue$ = this.store.select(
  //   'motor',
  //   'isUpdateStatusAllTrueSuccess',
  // );
  // isUpdateAllStatusFalse$ = this.store.select(
  //   'motor',
  //   'isUpdateStatusAllFalseSuccess',
  // );
  motorcycleForm: FormGroup;
  motorList: Motor[] = [];
  user: User = <User>{};
  reservationListByStartDate: Reservation[] = [];
  reservationListByEndDate: Reservation[] = [];
  userToGetReservation: User = <User>{};
  isFirstZeroInStartDate: boolean = false;
  isFirstZeroInEndDate: boolean = false;

  isUpdateStatusMotorOneTime = false;
  reservation_id: string = '';
  selectDays: number = 1;
  motor_id: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<{
      motor: MotorState;
      auth: AuthState;
      user: UserState;
      reservation: ReservationState;
      payment: PaymentState;
    }>,
  ) {
    //get endDate and startDate
    const dateCheck = new Date();
    dateCheck.setUTCHours(0, 0, 0, 0);
    const utcStringStartDate = dateCheck.toUTCString();
    dateCheck.setDate(dateCheck.getDate() - 1);
    const utcStringEndDate = dateCheck.toUTCString();

    console.log('Start date: ' + utcStringStartDate);
    console.log('End date: ' + utcStringEndDate);

    this.store.select('motor').subscribe((val) => {
      if (val != null && val != undefined) {
        this.motorList = val.motorList;
      }
    });
    this.motorcycleForm = this.formBuilder.group({
      numberOfMotorcycles: ['', Validators.required],
      // numberOfMotorcycles: ['1'],
    });
    this.store.dispatch(
      ReservationActions.getReservationByEndDate({ endDate: utcStringEndDate }),
    );
  }

  // updateQuantity() {
  //   const formControl = this.motorcycleForm.get('numberOfMotorcycles');
  //   if (formControl) {
  //     const selectedQuantity = formControl.value;
  //     return parseInt(selectedQuantity);
  //   }
  //   return 0; // Trả về giá trị mặc định nếu không tìm thấy form control
  // }

  updateQuantity() {
    const formControl = this.motorcycleForm.get('numberOfMotorcycles');
    if (
      formControl &&
      formControl.value &&
      !isNaN(parseInt(formControl.value))
    ) {
      return parseInt(formControl.value);
    }
    return 0; // Trả về 0 nếu không tìm thấy form control hoặc giá trị không hợp lệ
  }

  goToExtras() {
    this.activeTabIndex = 1;
  }
}
