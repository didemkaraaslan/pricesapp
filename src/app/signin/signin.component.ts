import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  errorMessage: string;

  constructor(private afAuth: AngularFireAuth, private route: Router) {}

  signin(email: string, password: string) {
    this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          this.route.navigate(['/home']);
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
  }

}
