import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  AfterViewInit,
  Inject,
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
import { MotorState } from '../../../../ngrx/motor/motor.state';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { UserState } from '../../../../ngrx/user/user.state';
import { ReservationState } from '../../../../ngrx/reservation/reservation.state';
import { PaymentState } from '../../../../ngrx/payment/payment.state';
import { Motor } from '../../../../model/motor.model';
import { User } from '../../../../model/user.model';
import { Reservation } from '../../../../model/reservation.model';
import * as UserActions from '../../../../ngrx/user/user.actions';
import * as ReservationActions from '../../../../ngrx/reservation/reservation.actions';
import * as MotorActions from '../../../../ngrx/motor/motor.actions';
import { Observable, Subscription } from 'rxjs';
import { MotorService } from '../../../../service/motor/motor.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TuiAlertService } from '@taiga-ui/core';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ShareModule, TaigaModule, MatDialogModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  city = ['Ho Chi Minh', 'Ha Noi', 'Hue'];
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
  selectedCity: string = '';
  subcriptions: Subscription[] = [];
  @ViewChild('dateCheckin') dateCheckin!: ElementRef;
  @ViewChild('dateCheckout') dateCheckout!: ElementRef;
  @ViewChild('paymentDialog', { static: true })
  paymentDialog!: ElementRef<HTMLDialogElement>;

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
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
      chooseCity: ['', Validators.required],
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
        console.log('lấy từ sessionStorage');
        // Lấy đối tượng user từ sessionStorage
        const userAsJson = sessionStorage.getItem('user');
        console.log(userAsJson);
        // Chuyển đổi chuỗi sang đối tượng user
        this.user = JSON.parse(userAsJson || '');
        this.store.dispatch(UserActions.storedUser(this.user));
      }
    });
    //follow get reservation by endDate
    // Theo dõi lấy reservation theo endDate
    this.reservationListByEndDate$.subscribe((val) => {
      if (val && val.length > 0) {
        const motorId = val.map((motor) => motor.motorId.motorId);
        this.reservationListByEndDate = val;
        console.log('motorId');
        this.store.dispatch(MotorActions.updateAllStatusTrue({ ids: motorId }));
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
    });
    //follow reservation of startDate
    // Theo dõi lấy reservation theo startDate
    this.reservationListByStartDate$.subscribe((val) => {
      if (val && val.length > 0) {
        const motorId = val.map((motor) => motor.motorId.motorId);
        this.reservationListByStartDate = val;
        console.log('motorId');
        this.store.dispatch(
          MotorActions.updateAllStatusFalse({ ids: motorId }),
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
        this.openPaymentDialog();
        console.log('successReser');
      }
    });
    //review
  }
  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);
  openPaymentDialog() {
    if (!this.user.uid) {
      this.alerts
        .open('You Need To Login To Rent Motor ', { label: 'Notifications!' })
        .subscribe();
    } else {
      const dialog = this.paymentDialog.nativeElement as HTMLDialogElement;
      this.selectedCity = this.chooseCity.value; // Cập nhật thành phố đã chọn
      dialog.showModal();
    }
  }
  // closePaymentDialog() {
  //   const dialog = this.paymentDialog.nativeElement as HTMLDialogElement;
  //   dialog.close();
  // }
  // khai báo gần như ngOnInit
  ngAfterViewInit(): void {
    this.setupDatePickers();
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
    this.selectedDays = 1;
  }
  //khai báo thêm để cho chúng sẵn sàng truy cập và thao tác bổ sung vào
  setupDatePickers(): void {}
  ngOnDestroy(): void {
    this.store.dispatch(ReservationActions.reset());
    this.isFirstZeroInEndDate = false;
    this.isFirstZeroInStartDate = false;
    this.subcriptions.forEach((subscription) => subscription.unsubscribe());
  }
  generateRandomId(length: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.join('');
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(MotorActions.getMotorById({ motorId: id }));
      }
    });

    //date-picker
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
      const timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
      this.selectedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
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
      const timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
      this.selectedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    });

    this.isCreateReservationSuccess$.subscribe((val) => {
      if (val) {
        this.closePaymentDialog();
        console.log('successReser');
      }
    });
  }

  closePaymentDialog() {
    const dialog = this.paymentDialog.nativeElement as HTMLDialogElement;
    dialog.close();
    this.cd.detectChanges(); // Force change detection
  }

  reservationData = {
    reservationId: '',
    motorId: '',
    customerId: '',
    startDate: '',
    endDate: '',
    city: '',
    status: false,
    total: 0,
    image: '',
    quantity: '',
    createdAt: '',
  };

  updateTotalDays() {
    // const startDate = new Date(this.motorcycleForm.value.dateFrom);
    // const endDate = new Date(this.motorcycleForm.value.dateTo);
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
  rentMotor(): void {
    // Open the payment dialog after creating the reservation
    this.openPaymentDialog();
  }
  onSubmit(item: Motor): void {
    const dateCheckin = document.getElementById(
      'date-checkin',
    ) as HTMLInputElement;
    const dateCheckout = document.getElementById(
      'date-checkout',
    ) as HTMLInputElement;
    const checkinDate = dateCheckin.valueAsDate;
    const checkoutDate = dateCheckout.valueAsDate;
    const startDate = new Date(this.dateCheckin.nativeElement.value);
    const endDate = new Date(this.dateCheckout.nativeElement.value);
    const totalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
    );
    const numberOfMotorcycles = this.motorcycleForm.get(
      'numberOfMotorcycles',
    )?.value;
    const rentalPricePerDay = item.price;
    const rentalTotal = rentalPricePerDay * totalDays * numberOfMotorcycles;
    const serviceFee = 5;
    const insuranceFee = 5;
    const totalPrice = rentalTotal + serviceFee + insuranceFee;

    if (checkinDate && checkoutDate) {
      console.log('Ngày check-in:', checkinDate);
      console.log('Ngày check-out:', checkoutDate);
      const string = this.generateRandomId(10);
      const currentDate = new Date();
      this.reservationData = {
        reservationId: item._id + this.user._id + string,
        motorId: item._id,
        customerId: this.user._id,
        startDate: checkinDate.toUTCString(),
        endDate: checkoutDate.toUTCString(),
        status: false,
        total: this.totalCost(),
        city: this.chooseCity.value,
        image: item.image._id,
        quantity: numberOfMotorcycles,
        createdAt: currentDate.toLocaleString(),
      };
      this.store.dispatch(
        ReservationActions.create({ reservation: this.reservationData }),
      );
    } else {
      console.log('Ngày không hợp lệ');
    }
  }

  formatPrice(price: number) {
    // Chuyển đổi số thành chuỗi và ngược lại
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu phẩy mỗi 3 số
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return priceString;
  }
}
