import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  User$: Observable<firebase.User>;


  constructor(private afAuth: AngularFireAuth) {
    this.User$ = this.afAuth.authState;
   }

  signOut() {
    this.afAuth.auth.signOut();
  }

  sendPasswordResetEmail(email: string) {
    return this.afAuth.auth
         .sendPasswordResetEmail(email);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth
         .signInWithEmailAndPassword(email, password);
  }

  createUserWithEmailAndPassword(email: string, password: string, name: string) {
    return this.afAuth.auth
         .createUserWithEmailAndPassword(email, password);
  }

  updateProfile(firebaseUser, name: string) {
    firebaseUser.updateProfile({
      displayName: name
    });
  }
}
