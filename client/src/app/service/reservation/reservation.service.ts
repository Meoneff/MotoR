import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../model/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private httpClient: HttpClient) {}

  create(reservation: Reservation): Observable<Reservation> {
    console.log(reservation);
    return this.httpClient.post<Reservation>(
      'http://localhost:3000/reservation/create',
      reservation,
    );
  }

  get(customerId: string, status?: boolean): Observable<Reservation[]> {
    let url = `http://localhost:3000/reservation/byCustomerId?customerId=${customerId}`;
    if (status !== undefined) {
      url += `&status=${status}`;
    }
    return this.httpClient.get<Reservation[]>(url);
  }

  getOne(reservationId: string): Observable<Reservation> {
    console.log(reservationId);
    return this.httpClient.get<Reservation>(
      `http://localhost:3000/reservation/byReservationId?id=${reservationId}`,
    );
  }

  getByStartDate(startDate: string): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(
      `http://localhost:3000/reservation/byStartDate?startDate=${startDate}`,
    );
  }

  getByEndDate(endDate: string): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(
      `http://localhost:3000/reservation/byEndDate?endDate=${endDate}`,
    );
  }

  deleteReservationById(reservationId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `http://localhost:3000/reservation/delete?id=${reservationId}`,
    );
  }

  updateReservationStatus(
    reservationId: string,
    status: boolean,
  ): Observable<Reservation> {
    return this.httpClient.put<Reservation>(
      `http://localhost:3000/reservation/updateStatus?id=${reservationId}`,
      { status },
    );
  }

  getStorageById(storageId: string): Observable<Storage> {
    return this.httpClient.get<Storage>(
      `http://localhost:3000/storage/${storageId}`,
    );
  }
}
