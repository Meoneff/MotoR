import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { Reservation } from '../../../model/reservation.model';
import { Payment } from '../../../model/payment.model';
import { Store } from '@ngrx/store';
import { UserState } from '../../../ngrx/user/user.state';
import { ReservationState } from '../../../ngrx/reservation/reservation.state';
import { PaymentState } from '../../../ngrx/payment/payment.state';
import * as ReservationActions from '../../../ngrx/reservation/reservation.actions';
import * as UserActions from '../../../ngrx/user/user.actions';
import * as PaymentActions from '../../../ngrx/payment/payment.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { robotoRegular } from '../../../shared/roboto-regular';
import { ReservationService } from '../../../service/reservation/reservation.service';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';

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

  paymentData = {
    paymentId: '',
    dayPayment: '',
    reservationIds: [] as string[], // Change to array of strings
    customerId: '',
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
    private reservationService: ReservationService,
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
    this.paymentForm = this.fb.group({
      paymentMethod: [''],
    });

    this.loadReservations();

    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe((value) => {
      console.log('Payment Method Control Value:', value);
      this.payMethods = value;
    });
  }

  loadReservations() {
    this.reservationService
      .get(this.user._id, false)
      .subscribe((reservations: Reservation[]) => {
        this.reservations = reservations;
        this.calculateTotalAmount();
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

    const reservationIds = this.reservations.map(
      (reservation) => reservation._id,
    );

    this.paymentData = {
      paymentId: this.generateRandomId(10),
      dayPayment: currentDate,
      reservationIds: reservationIds,
      customerId: this.user._id,
      status: true,
      isPaid: paymentMethodValue !== 'Direct Cash',
      amount: this.totalAmount,
      paymentMethod: paymentMethodValue,
    };

    console.log('Payment Data:', this.paymentData); // Log dữ liệu thanh toán trước khi gửi

    // Dispatch create payment action
    this.store.dispatch(PaymentActions.create({ payment: this.paymentData }));

    this.generatePDF();

    this.clearReservations();
  }

  generatePDF(): void {
    const doc = new jsPDF();
    doc.addFileToVFS('Roboto-Regular.ttf', robotoRegular);
    doc.addFont('Roboto-Regular.ttf', 'RobotoRegular', 'normal');
    doc.setFont('RobotoRegular');

    // Add title
    doc.setFontSize(20);
    doc.text('Reservation Details - MotoR', 10, 10);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 20);

    // Add user information
    doc.setFontSize(14);
    doc.text('Customer Information', 10, 30);
    doc.setFontSize(12);
    doc.text(`Name: ${this.user.name}`, 10, 35);
    doc.text(`Email: ${this.user.email}`, 10, 40);

    // Add a line break
    doc.setLineWidth(0.5);
    doc.line(10, 45, 200, 45);

    // Add reservation details
    doc.setFontSize(14);
    doc.text('Reservation Details', 10, 55);

    const tableData = this.reservations.map((reservation) => [
      reservation.motorId.name,
      reservation.city,
      reservation.quantity.toString(),
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
      startY: 60,
      head: [tableColumns],
      body: tableData,
      styles: { font: 'RobotoRegular' },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    // Add summary
    doc.setFontSize(14);
    doc.text('Summary', 10, finalY);
    doc.setFontSize(12);
    doc.text(`Total Amount: $${this.totalAmount}`, 10, finalY + 10);
    doc.text(`Payment Method: ${this.payMethods.name}`, 10, finalY + 20);

    // Save the PDF
    doc.save('reservation-details.pdf');
  }

  clearReservations(): void {
    this.reservations.forEach((reservation) => {
      this.reservationService
        .updateReservationStatus(reservation._id, true)
        .subscribe();
    });
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
  removeReservation(reservationId: string): void {
    this.reservationService.deleteReservationById(reservationId).subscribe(
      () => {
        this.reservations = this.reservations.filter(
          (reservation) => reservation._id !== reservationId,
        );
        this.calculateTotalAmount();
      },
      (error) => {
        console.error('Error deleting reservation:', error);
      },
    );
  }
}
