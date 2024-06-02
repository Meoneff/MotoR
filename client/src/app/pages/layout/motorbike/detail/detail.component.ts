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
import { ActivatedRoute, Router } from '@angular/router';
import { ShareModule } from '../../../../shared/share.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MotorState } from '../../../../nrgx/motor/motor.state';
import { AuthState } from '../../../../nrgx/auth/auth.state';
import { UserState } from '../../../../nrgx/user/user.state';
import { ReservationState } from '../../../../nrgx/reservation/reservation.state';
import { PaymentState } from '../../../../nrgx/payment/payment.state';
import { Motor } from '../../../../model/motor.model';
import { User } from '../../../../model/user.model';
import { Reservation } from '../../../../model/reservation.model';
import * as UserActions from '../../../../nrgx/user/user.actions';
import * as ReservationActions from '../../../../nrgx/reservation/reservation.actions';
import * as MotorActions from '../../../../nrgx/motor/motor.actions';
import { Observable, Subscription } from 'rxjs';
import { MotorService } from '../../../../service/motor/motor.service';
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

  city = ['Thành phố Hồ Chí Minh', 'Hà Nội', 'Huế'];

  chooseCity = new FormControl();
  selectedMotor$: Observable<Motor> = this.store.select(
    'motor',
    'selectedMotor',
  );

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
  isUpdateAllStatusTrue$ = this.store.select(
    'motor',
    'isUpdateAllStatusTrueSuccess',
  );
  isUpdateAllStatusFalse$ = this.store.select(
    'motor',
    'isUpdateAllStatusFalseSuccess',
  );

  selectedMotor: Motor[] = [];
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
  selectedDays: number = 1;
  motor_id: string = '';
  total: number = 0;
  subcriptions: Subscription[] = [];

  @ViewChild('dateCheckin') dateCheckin!: ElementRef;
  @ViewChild('dateCheckout') dateCheckout!: ElementRef;

  constructor(
    private cd: ChangeDetectorRef,
    private motorService: MotorService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.user$.subscribe((user) => {
      if (user._id != null && user._id != undefined) {
        console.log(user);
        this.user = user;
        const userAsJson = JSON.stringify(user);
        //save userAsJson at sessionStorage
        sessionStorage.setItem('user', userAsJson);
        console.log('lưu vào sessionStorage');
      } else {
        console.log('get từ sesssionStorage');

        //get user from sessionStorage
        const userAsJson = sessionStorage.getItem('user');
        console.log(userAsJson);
        //chuyển đổi sang đối tượng user
        this.user = JSON.parse(userAsJson || '');
        this.store.dispatch(UserActions.storedUser(this.user));
      }
    });

    //follow get reservation by endDate
    this.reservationListByEndDate$.subscribe((val) => {
      if (val.length > 0) {
        const motorId = val.map((motor) => motor.motorId.motorId);
        this.reservationListByEndDate = val;
        console.log('motorId');
        this.store.dispatch(
          MotorActions.updateAllStatusTrue({ motorId: motorId }),
        );
      } else if (this.isFirstZeroInEndDate) {
        if (!this.isUpdateStatusMotorOneTime) {
          this.store.dispatch(
            ReservationActions.getReservationByStartDate({
              startDate: utcStringStartDate,
            }),
          );
          this.isUpdateStatusMotorOneTime = true;
        }
      } else {
        this.isFirstZeroInEndDate = true;
      }
      //
    });

    //folow get reservation by startDate
    this.reservationListByStartDate$.subscribe((val) => {
      if (val.length > 0) {
        const motorId = val.map((motor) => motor.motorId.motorId);
        this.reservationListByStartDate = val;
        console.log('motorId');
        this.store.dispatch(
          MotorActions.updateAllStatusFalse({ motorId: motorId }),
        );
      } else if (this.isFirstZeroInStartDate) {
        console.log(this.isUpdateStatusMotorOneTime);
        console.log(this.isFirstZeroInStartDate);

        this.store.dispatch(MotorActions.get({ isConfirmed: true }));
        this.isUpdateStatusMotorOneTime = true;
        this.isFirstZeroInStartDate = false;
      } else {
        this.isFirstZeroInStartDate = true;
      }
    });

    //folow update status motor
    this.isUpdateAllStatusFalse$.subscribe((val) => {
      if (val) {
        this.store.dispatch(MotorActions.get({ isConfirmed: true }));
      }
    });
    this.isUpdateAllStatusTrue$.subscribe((val) => {
      if (val) {
        console.log('start');
        if (!this.isUpdateStatusMotorOneTime) {
          this.store.dispatch(
            ReservationActions.getReservationByStartDate({
              startDate: utcStringStartDate,
            }),
          );
          this.isUpdateStatusMotorOneTime = true;
        }
      }
    });

    //follow create card reservation
    this.isCreateReservationSuccess$.subscribe((val) => {
      if (val) {
        this.router.navigate(['/payment']);
      }
    });
    //review
  }

  // khai báo gần như ngOnInit
  ngAfterViewInit(): void {
    this.setupDatePickers();
  }

  //khai báo thêm để cho chúng sẵn sàng truy cập và thao tác bổ sung vào

  setupDatePickers(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.dateCheckin.nativeElement.valueAsDate = today;
    this.dateCheckout.nativeElement.valueAsDate = tomorrow;

    this.dateCheckin.nativeElement.min = today.toISOString().split('T')[0];
    const minDateCheckout = new Date(today);
    minDateCheckout.setDate(today.getDate() + 1);
    this.dateCheckout.nativeElement.min = minDateCheckout
      .toISOString()
      .split('T')[0];

    this.dateCheckin.nativeElement.addEventListener('input', () => {
      this.updateTotalDays();
      const checkinDate = new Date(this.dateCheckin.nativeElement.value);
      const checkoutDate = new Date(this.dateCheckout.nativeElement.value);
      if (checkinDate > checkoutDate) {
        const newCheckoutDate = new Date(checkinDate);
        newCheckoutDate.setDate(newCheckoutDate.getDate() + 1);
        this.dateCheckout.nativeElement.valueAsDate = newCheckoutDate;
      }
      const timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
      this.selectedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    });

    this.dateCheckout.nativeElement.addEventListener('input', () => {
      this.updateTotalDays();
      const checkinDate = new Date(this.dateCheckin.nativeElement.value);
      const checkoutDate = new Date(this.dateCheckout.nativeElement.value);
      if (checkoutDate < checkinDate) {
        const newCheckinDate = new Date(checkoutDate);
        newCheckinDate.setDate(newCheckinDate.getDate() - 1);
        this.dateCheckin.nativeElement.valueAsDate = newCheckinDate;
      }
      const timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
      this.selectedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(MotorActions.getMotorById({ motorId: id }));
      }
    });

    //date-pikcer
    const dateContainers = document.querySelectorAll('.input-container');
    dateContainers.forEach((dateContainer) => {
      const dateInput = dateContainer.querySelector(
        '.date-field',
      ) as HTMLInputElement;
      if (dateInput) {
        dateContainer.addEventListener('click', (event) => {
          dateInput.select();
        });
      }
    });
    const dateCheckin = document.getElementById(
      'date-checkin',
    ) as HTMLInputElement;
    const dateCheckout = document.getElementById(
      'date-checkout',
    ) as HTMLInputElement;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateCheckin.valueAsDate = today;
    dateCheckout.valueAsDate = tomorrow;

    // Không cho phép chọn ngày trước ngày hiện tại
    dateCheckin.min = today.toISOString().split('T')[0];
    const minDateCheckout = new Date(today);
    minDateCheckout.setDate(today.getDate() + 1);
    dateCheckout.min = minDateCheckout.toISOString().split('T')[0];

    dateCheckin.addEventListener('input', () => {
      this.updateTotalDays();
      const checkinDate = new Date(dateCheckin.value);
      const checkoutDate = new Date(dateCheckout.value);
      if (checkinDate > checkoutDate) {
        const newCheckoutDate = new Date(checkinDate);
        newCheckoutDate.setDate(newCheckoutDate.getDate() + 1);
        dateCheckout.valueAsDate = newCheckoutDate;
      }
      // Tính toán tổng số ngày
      const timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
      this.selectedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      // this.totalCost = this.selectedDays * this.selectedMotor. + 7900 * 2;
      // Hiển thị tổng tiền trên giao diện
      // const totalCostElement = document.getElementById('total-cost');
      // if (totalCostElement) {
      //   totalCostElement.textContent = `${this.totalCost}`;
      // }
    });

    dateCheckout.addEventListener('input', () => {
      this.updateTotalDays();
      const checkinDate = new Date(dateCheckin.value);
      const checkoutDate = new Date(dateCheckout.value);
      if (checkoutDate < checkinDate) {
        const newCheckinDate = new Date(checkoutDate);
        newCheckinDate.setDate(newCheckinDate.getDate() - 1);
        dateCheckin.valueAsDate = newCheckinDate;
      }
      // Tính toán tổng số ngày
      const timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
      this.selectedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      // this.totalCost = this.selectedDays * this.selectCar.price + 7900 * 2;
      // Hiển thị tổng tiền trên giao diện
      // const totalCostElement = document.getElementById('total-cost');
      // if (totalCostElement) {
      //   totalCostElement.textContent = `${this.totalCost}`;
      // }
    });
    //date-pikcer
  }

  updateTotalDays() {
    const dateCheckin = document.getElementById(
      'date-checkin',
    ) as HTMLInputElement;
    const dateCheckout = document.getElementById(
      'date-checkout',
    ) as HTMLInputElement;

    const checkinDate = new Date(dateCheckin.value);
    const checkoutDate = new Date(dateCheckout.value);

    if (checkinDate && checkoutDate) {
      const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.selectedDays = daysDiff; // Cập nhật giá trị tổng ngày
      // Trigger change detection
      this.cd.detectChanges();
    }
  }
  item = this.motorService.getMotorDetail();

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

  totalCost(): number {
    if (
      !this.item ||
      !this.item.price ||
      !this.selectedDays ||
      !this.updateQuantity()
    ) {
      // Trả về 0 nếu không có chi tiết hoặc thông tin giá hoặc số ngày thuê hoặc số lượng chưa được chọn
      return 0;
    }

    const rentalPrice = this.item.price;
    const quantity = this.updateQuantity();
    const rentalDays = this.selectedDays;

    // Tính toán tổng giá trị thuê xe
    const rentalTotal = rentalPrice * quantity * rentalDays;

    // Các khoản phí cố định
    const serviceFee = 5;
    const insuranceFee = 5;

    // Tổng giá trị
    const total = rentalTotal + serviceFee + insuranceFee;

    return total;
  }

  goToRent() {
    this.activeTabIndex = 1;
  }
}
