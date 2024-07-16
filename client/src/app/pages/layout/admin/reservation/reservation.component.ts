import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PaymentState } from '../../../../ngrx/payment/payment.state';
import * as PaymentActions from '../../../../ngrx/payment/payment.actions';
import { TuiAlertService } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  payments: any[] = [];
  selectedPayment: any = null;
  payForm: FormGroup;

  constructor(
    private store: Store<{ payment: PaymentState }>,
    private alerts: TuiAlertService,
    private fb: FormBuilder,
  ) {
    this.payForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
    });

    this.store.select('payment').subscribe(
      (state) => {
        this.payments = state.paymentList.map((payment) => {
          const isPaid =
            payment.paymentMethod?.name === 'Direct Cash'
              ? false
              : payment.isPaid;

          return {
            ...payment,
            customerId: payment.customerId || { name: 'N/A' },
            reservationIds: payment.reservationIds || [],
            paymentMethod: payment.paymentMethod || { name: 'N/A' },
            isPaid: isPaid,
            reservationIdsString: (payment.reservationIds || [])
              .map(
                (reservation: any) =>
                  reservation._id || reservation.id || reservation,
              )
              .join(', '),
          };
        });
      },
      (error) => {
        console.error('Error fetching payments', error);
      },
    );
  }

  ngOnInit(): void {
    this.store.dispatch(PaymentActions.getAllPayments());
  }

  deletePayment(id: string): void {
    this.store.dispatch(PaymentActions.deletePayment({ id }));
    this.alerts.open('Payment deleted successfully!', { label: 'Success' });
  }

  openPayModal(payment: any): void {
    this.selectedPayment = payment;
  }

  closePayModal(): void {
    this.selectedPayment = null;
    this.payForm.reset();
  }

  submitPayment(): void {
    if (this.payForm.valid) {
      const updatedPayment = {
        ...this.selectedPayment,
        isPaid: true,
        amount: this.payForm.get('amount')?.value,
      };
      // this.store.dispatch(PaymentActions.updatePayment({ payment: updatedPayment }));
      this.alerts.open('Payment updated successfully!', { label: 'Success' });
      this.closePayModal();
    }
  }
}
