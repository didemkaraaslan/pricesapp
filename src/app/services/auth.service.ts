import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

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
/*
  getUser() {
    this.afAuth.authState.subscribe(firebaseUser => this.User = firebaseUser);
  }
*/
}
