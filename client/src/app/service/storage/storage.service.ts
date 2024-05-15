import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '../../model/storage.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private httpClient: HttpClient) {}

  create(file: File, fileName: string) {
    const formData = new FormData();
    formData.append('files', file);

    return this.httpClient.post(
      `http://localhost:3000/storage/upload?folderName=${fileName}`,
      formData,
    );
  }

  getStorage(fileName: string) {
    return this.httpClient.get<Storage>(
      `http://localhost:3000/storage/image?folderName=${fileName}`,
    );
  }
}
