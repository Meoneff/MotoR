import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../../model/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}
  create(payment: any) {
    console.log(payment);

    return this.httpClient.post<Payment>(
      'http://localhost:3000/payment/create',
      payment,
    );
  }
  get(paymentId: string) {
    return this.httpClient.get<Payment>(
      `http://localhost:3000/payment?id=${paymentId}`,
    );
  }
}
