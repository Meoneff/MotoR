import { Injectable } from '@angular/core';
import { Manufacturer } from '../../model/manufacturer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService {
  constructor(private httpClient: HttpClient) {}
  getManufacturers() {
    return this.httpClient.get<Manufacturer[]>(
      'http://localhost:3000/manufacturer/get/all',
    );
  }
  getManufacturerById(manufacturerId: string) {
    return this.httpClient.get<Manufacturer>(
      'http://localhost:3000/manufacturer/get/id?manufacturerId=${manufacturerId}',
    );
  }
}
