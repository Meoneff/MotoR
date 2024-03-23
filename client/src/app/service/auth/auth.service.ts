import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  loginWithGoogle() {
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          let creadential = await signInWithPopup(
            this.auth,
            new GoogleAuthProvider(),
          );
          let idToken = await creadential.user.getIdToken();
          resolve(idToken);
        } catch {
          reject('Cannot login with Google');
        }
      }),
    );
  }

  logout() {
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          signOut(this.auth).then(() => {
            resolve('Logout success!!!');
          });
        } catch {
          reject('Cannot login with Google');
        }
      }),
    );
  }
}
