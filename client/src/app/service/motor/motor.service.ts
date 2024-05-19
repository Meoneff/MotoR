import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Motor } from '../../model/motor.model';

@Injectable({
  providedIn: 'root',
})
export class MotorService {
  constructor(private httpClient: HttpClient) {}

  getMotor() {
    console.log('getMotor');
    return this.httpClient.get<Motor[] | any>(
      'http://localhost:3000/motor/get',
    );
  }
  getMotorById(id: string) {
    return this.httpClient.get<Motor | any>(
      `http://localhost:3000/motor/byMotorId?id=${id}`,
    );
  }
  getMotorByObjectId(id: string) {
    return this.httpClient.get<Motor | any>(
      `http://localhost:3000/motor/byObjectId?id=${id}`,
    );
  }
  createMotor(motor: any) {
    return this.httpClient.post<Motor | any>(
      'http://localhost:3000/motor/create',
      motor,
    );
  }
  updateMotor(motor: any) {
    return this.httpClient.put<Motor | any>(
      'http://localhost:3000/motor/update',
      motor,
    );
  }
  deleteMotor(id: number) {
    return this.httpClient.delete<number | any>(
      `http://localhost:3000/motor/delete?id=${id}`,
    );
  }
}
