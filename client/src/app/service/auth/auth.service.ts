import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { from } from 'rxjs';
import { userFirebase } from '../../model/userFirebase.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async loginWithGoogle() {
    const userFirebase: userFirebase = <userFirebase>{};
    let provider = new GoogleAuthProvider();
    try {
      let credential = await signInWithPopup(this.auth, provider);
      userFirebase.email = credential.user.email ?? '';
      userFirebase.name = credential.user.displayName ?? '';
      userFirebase.picture = credential.user.photoURL ?? '';
      userFirebase.uid = credential.user.uid;
      return userFirebase;
    } catch (error) {
      console.log(error);
    }
    return userFirebase;
  }

  logout() {
    console.log('logout');
    return from(this.auth.signOut());
  }
}
