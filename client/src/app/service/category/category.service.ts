import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}
  getCategories() {
    return this.httpClient.get<Category[]>(
      'http://localhost:3000/category/all',
    );
  }
}
