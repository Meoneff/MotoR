import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Payment } from '../../../../model/payment.model';
import * as PaymentActions from '../../../../ngrx/payment/payment.actions';
import { TuiAlertService } from '@taiga-ui/core';
import { PaymentState } from '../../../../ngrx/payment/payment.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  payments: Payment[] = [];

  constructor(
    private store: Store<{ payment: PaymentState }>,
    private alerts: TuiAlertService,
  ) {
    this.store.select('payment').subscribe((state) => {
      this.payments = state.paymentList;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(PaymentActions.getAll());
  }

  deletePayment(id: string): void {
    this.store.dispatch(PaymentActions.deletePayment({ id }));
    this.alerts.open('Payment deleted successfully!', { label: 'Success' });
  }
}
