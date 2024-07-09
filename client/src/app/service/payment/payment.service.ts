// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Payment } from '../../model/payment.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class PaymentService {
//   constructor(private httpClient: HttpClient) {}

//   create(payment: any) {
//     console.log(payment);
//     return this.httpClient.post<Payment>(
//       'http://localhost:3000/payment/create',
//       payment,
//     );
//   }

//   get(paymentId: string) {
//     return this.httpClient.get<Payment[]>(
//       `http://localhost:3000/payment?id=${paymentId}`,
//     );
//   }

//   update(id: string, payment: Partial<Payment>) {
//     return this.httpClient.put<Payment>(
//       `http://localhost:3000/payment/update?id=${id}`,
//       payment,
//     );
//   }

//   updatePaymentMethod(id: string, paymentMethod: string, amount: number) {
//     return this.httpClient.put<Payment>(
//       `http://localhost:3000/payment/updatePaymentMethod?id=${id}`,
//       { paymentMethod, amount },
//     );
//   }

//   delete(id: string) {
//     return this.httpClient.delete<void>(
//       `http://localhost:3000/payment/delete?id=${id}`,
//     );
//   }
// }

/////////////////

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Payment } from '../../model/payment.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class PaymentService {
//   constructor(private httpClient: HttpClient) {}

//   create(payment: any): Observable<Payment> {
//     console.log(payment);
//     return this.httpClient.post<Payment>(
//       'http://localhost:3000/payment/create',
//       payment,
//     );
//   }

//   get(paymentId: string): Observable<Payment> {
//     return this.httpClient.get<Payment>(
//       `http://localhost:3000/payment?id=${paymentId}`,
//     );
//   }

//   update(id: string, payment: Partial<Payment>): Observable<Payment> {
//     return this.httpClient.put<Payment>(
//       `http://localhost:3000/payment/update?id=${id}`,
//       payment,
//     );
//   }

//   updatePaymentMethod(
//     id: string,
//     paymentMethod: string,
//     amount: number,
//   ): Observable<Payment> {
//     return this.httpClient.put<Payment>(
//       `http://localhost:3000/payment/updatePaymentMethod?id=${id}`,
//       { paymentMethod, amount },
//     );
//   }

//   delete(id: string): Observable<void> {
//     return this.httpClient.delete<void>(
//       `http://localhost:3000/payment/delete?id=${id}`,
//     );
//   }
// }

//////////////////////////////////

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.httpClient.get<Payment[]>(
      `http://localhost:3000/payment?id=${paymentId}`,
    );
  }

  update(id: string, payment: Partial<Payment>) {
    return this.httpClient.put<Payment>(
      `http://localhost:3000/payment/update?id=${id}`,
      payment,
    );
  }

  updatePaymentMethod(id: string, paymentMethod: string, amount: number) {
    return this.httpClient.put<Payment>(
      `http://localhost:3000/payment/updatePaymentMethod?id=${id}`,
      { paymentMethod, amount },
    );
  }

  delete(id: string) {
    return this.httpClient.delete<void>(
      `http://localhost:3000/payment/delete?id=${id}`,
    );
  }
}
