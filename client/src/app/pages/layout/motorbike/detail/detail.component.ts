import { Component } from '@angular/core';
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

  motorcycleForm: FormGroup;

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
    this.motorcycleForm = this.formBuilder.group({
      numberOfMotorcycles: ['', Validators.required],
      // numberOfMotorcycles: ['1'],
    });
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
