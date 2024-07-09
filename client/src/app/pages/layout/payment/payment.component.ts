import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { Reservation } from '../../../model/reservation.model';
import { Payment } from '../../../model/payment.model';
import { Store } from '@ngrx/store';
import { UserState } from '../../../nrgx/user/user.state';
import { ReservationState } from '../../../nrgx/reservation/reservation.state';
import { PaymentState } from '../../../nrgx/payment/payment.state';
import * as ReservationActions from '../../../nrgx/reservation/reservation.actions';
import * as UserActions from '../../../nrgx/user/user.actions';
import * as PaymentActions from '../../../nrgx/payment/payment.actions';
import { Motor } from '../../../model/motor.model';
import { Storage } from '../../../model/storage.model';
import { ShareModule } from '../../../shared/share.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { robotoRegular } from '../../../shared/roboto-regular';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnDestroy, OnInit {
  user: User = <User>{};
  user$ = this.store.select('user', 'user');
  reservation$ = this.store.select('reservation', 'reservationList');
  payment$ = this.store.select('payment', 'payment');
  reservations: Reservation[] = [];
  isCreatePaymentSuccess$ = this.store.select('payment', 'isSuccessful');
  isSelectedReservation: boolean = false;
  totalAmount: number = 0;
  payMethods: any;
  paymentForm: FormGroup;
  paymentMethods = [
    {
      name: 'Mastercard',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg',
      value: 'mastercard',
    },
    {
      name: 'Visa',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg',
      value: 'visa',
    },
    {
      name: 'PayPal',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
      value: 'paypal',
    },
    {
      name: 'MoMo',
      logo: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
      value: 'MoMo',
    },
    {
      name: 'Direct Cash',
      value: 'Direct Cash',
    },
  ];

  selectedReservation: Reservation = {
    _id: '',
    reservationId: '',
    motorId: <Motor>{},
    customerId: <User>{},
    startDate: '',
    endDate: '',
    status: false,
    selectedDays: '',
    quantity: 0,
    city: '',
    image: <Storage>{},
    total: 0,
  };

  paymentData = {
    paymentId: '',
    dayPayment: '',
    reservationId: '',
    customerId: '',
    motorId: '',
    status: true,
    isPaid: true,
    amount: 0,
    paymentMethod: '',
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<{
      user: UserState;
      reservation: ReservationState;
      payment: PaymentState;
    }>,
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: [''],
    });
    this.user$.subscribe((user) => {
      if (user._id != null && user._id != undefined) {
        console.log(user);
        this.store.dispatch(ReservationActions.get({ customerId: user._id }));
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
        this.calculateTotalAmount();
      }
      console.log(this.reservations);
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ReservationActions.reset());
  }

  ngOnInit(): void {
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe((value) => {
      console.log('Payment Method Control Value:', value);
      this.payMethods = value;
    });
  }

  onPaymentMethodChange(event: any): void {
    console.log('Payment Method Selected:', event);
  }

  rentPay(): void {
    const paymentMethodValue = this.paymentForm.get('paymentMethod')?.value;
    console.log('Payment Method Value:', paymentMethodValue); // Log the payment method value

    const paymentMethod = this.paymentMethods.find(
      (method) => method.value === paymentMethodValue,
    );

    const currentDate = new Date().toISOString();

    this.paymentData = {
      paymentId: this.generateRandomId(10),
      dayPayment: currentDate,
      reservationId: this.selectedReservation._id,
      customerId: this.user._id,
      motorId: this.selectedReservation.motorId._id,
      status: true,
      isPaid: true,
      amount: this.totalAmount,
      paymentMethod: paymentMethodValue,
    };

    // Dispatch create payment action
    this.store.dispatch(PaymentActions.create({ payment: this.paymentData }));

    // Dispatch delete reservation action
    this.store.dispatch(
      ReservationActions.deleteReservation({
        reservationId: this.selectedReservation._id,
      }),
    );

    const doc = new jsPDF();
    doc.addFileToVFS('Roboto-Regular.ttf', robotoRegular);
    doc.addFont('Roboto-Regular.ttf', 'RobotoRegular', 'normal');
    doc.setFont('RobotoRegular');

    doc.setFontSize(16);
    doc.text('Reservation Details', 10, 10);
    doc.setFontSize(12);

    const tableData = this.reservations.map((reservation) => [
      reservation.motorId.name,
      reservation.city,
      reservation.quantity,
      this.formatDateWithComma(reservation.startDate),
      this.formatDateWithComma(reservation.endDate),
      `$${reservation.total}`,
    ]);

    const tableColumns = [
      'Motor',
      'City Rent',
      'Quantity',
      'Start Date',
      'End Date',
      'Total',
    ];

    (doc as any).autoTable({
      startY: 20,
      head: [tableColumns],
      body: tableData,
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(16);
    doc.text('Summary', 10, finalY);
    doc.setFontSize(12);
    doc.text(`Total Amount: $${this.totalAmount}`, 10, finalY + 10);
    doc.text(`Payment Method: ${this.payMethods.name}`, 10, finalY + 20);
    console.log('Payment Method Name:', this.payMethods); // Log the payment method name
    const currentDateFormatted = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDateFormatted}`, 10, finalY + 30);

    doc.save('reservation-details.pdf');

    this.clearReservations();
  }

  clearReservations(): void {
    this.reservations = [];
    this.calculateTotalAmount();
  }

  generateRandomId(length: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.join('');
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.reservations.reduce(
      (sum, reservation) => sum + reservation.total,
      0,
    );
  }

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
