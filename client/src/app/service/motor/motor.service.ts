import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Motor } from '../../model/motor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MotorService {
  private baseURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getMotor(isConfirmed: boolean) {
    console.log('getMotor');
    return this.httpClient.get<Motor[] | any>(
      'http://localhost:3000/motor/get',
    );
  }
  getMotorById(id: string) {
    return this.httpClient.get<Motor | any>(
      `http://localhost:3000/motor/byMotorId?motorId=${id}`,
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
      `http://localhost:3000/motor/update?id=${motor.motorId}`,
      motor,
    );
  }
  deleteMotor(motorId: string) {
    return this.httpClient.delete<string | any>(
      `http://localhost:3000/motor/delete?id=${motorId}`,
    );
  }
  ///////////////////////////////////////////////////
  // confirmMotor(motorId: string) {
  //   return this.httpClient.put<Motor | any>(
  //     `http://localhost:3000/motor/isconfirmMotor?motorId=${motorId}`,
  //   );
  // }
  ////////////////////////////////////////////////////////////////
  //getMotorByCategoryId
  getMotorByCategoryId(categoryId: string): Observable<Motor[]> {
    return this.httpClient.get<Motor[]>(
      `http://localhost:3000/motor/motorCategoryId?categoryId=${categoryId}`,
    );
  }
  ///////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  private motorKey = 'motorItems';

  motorItems: Motor = {} as Motor;

  addToMotorDetail(motorDetail: Motor): void {
    this.motorItems = {
      _id: motorDetail._id,
      motorId: motorDetail.motorId,
      name: motorDetail.name,
      model: motorDetail.model,
      categoryId: motorDetail.categoryId,
      manufacturerId: motorDetail.manufacturerId,
      price: motorDetail.price,
      description: motorDetail.description,
      image: motorDetail.image,
      status: motorDetail.status,
      quantity: motorDetail.quantity,
    };
    this.saveMotorDetailToMotorStorage();
  }
  private saveMotorDetailToMotorStorage() {
    localStorage.setItem(this.motorKey, JSON.stringify(this.motorItems));
  }

  getMotorDetail() {
    this.loadMotorDetailFromLocalStorage();
    console.log(this.motorItems);
    return this.motorItems;
  }
  private loadMotorDetailFromLocalStorage(): void {
    const storedItems = localStorage.getItem(this.motorKey);
    if (storedItems) {
      this.motorItems = JSON.parse(storedItems);
    }
    console.log('get thanh cong');
  }
}
