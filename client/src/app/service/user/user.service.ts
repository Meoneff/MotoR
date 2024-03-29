import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  createUser(newUser: any) {
    newUser = {
      uid: newUser.uid,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      avatar: newUser.avatar,
      address: newUser.address,
      role: 'user',
      password: newUser.password,
    };
    return this.httpClient.post<User>(
      environment.host_url + 'user',
      newUser,
      {},
    );
  }

  getUserByEmail(email: string) {
    return this.httpClient.get<User>(environment.host_url + `user/${email}`);
  }

  getUser(uid: string, idToken: string) {
    return this.httpClient.get<User>(environment.host_url + `user/${uid}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${idToken}`,
      }),
    });
  }
}
