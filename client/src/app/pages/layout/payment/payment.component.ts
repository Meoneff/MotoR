import { Component, OnDestroy } from '@angular/core';
import { User } from '../../../model/user.model';
import { Reservation } from '../../../model/reservation.model';
import { Store } from '@ngrx/store';
import { UserState } from '../../../nrgx/user/user.state';
import { ReservationState } from '../../../nrgx/reservation/reservation.state';
import { PaymentState } from '../../../nrgx/payment/payment.state';
import * as ResevationActions from '../../../nrgx/reservation/reservation.actions';
import * as UserActions from '../../../nrgx/user/user.actions';
import * as PaymentActions from '../../../nrgx/payment/payment.actions';
import { Motor } from '../../../model/motor.model';
import { Storage } from '../../../model/storage.model';
import { ShareModule } from '../../../shared/share.module';
import { TaigaModule } from '../../../shared/taiga.module';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnDestroy {
  user: User = <User>{};
  user$ = this.store.select('user', 'user');
  reservation$ = this.store.select('reservation', 'reservationList');
  payment$ = this.store.select('payment', 'payment');
  reservations: Reservation[] = [];
  isCreatePaymentSuccess$ = this.store.select('payment', 'isSuccessful');
  isSelectedReservation: boolean = false;

  selectedReservation: Reservation = {
    _id: '',
    reservationId: '',
    motorId: <Motor>{},
    customerId: <User>{},
    startDate: '',
    endDate: '',
    status: false,
    selectedDays: '',
    city: '',
    image: <Storage>{},
    total: 0,
  };

  constructor(
    private store: Store<{
      user: UserState;
      reservation: ReservationState;
      payment: PaymentState;
    }>,
  ) {
    this.user$.subscribe((user) => {
      if (user._id != null && user._id != undefined) {
        console.log(user);
        this.store.dispatch(ResevationActions.get({ customerId: user._id }));
        this.user = user;
      } else {
        const userAsJson = sessionStorage.getItem('user');
        this.user = JSON.parse(userAsJson || '');
        this.store.dispatch(UserActions.storedUser(this.user));
      }
    });
    this.reservation$.subscribe((reservationList) => {
      if (reservationList != null && reservationList != undefined) {
        this.reservations = reservationList;
      }
      console.log(this.reservations);
    });
  }
  ngOnDestroy(): void {
    this.store.dispatch(ResevationActions.reset());
  }

  generateRandomId(length: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result.join('');
  }

  // formatDate(dateString: string): string {
  //   const date = new Date(dateString);
  //   return date.toDateString(); // "Thu, 20 Jun 2024"
  // }

  formatDateWithComma(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options).replace(/,/, ',');
  }
}
