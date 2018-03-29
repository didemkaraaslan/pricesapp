import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { User } from '../models/user';
import { Router } from '@angular/router';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorMessage = '';

  constructor(
    private afAuth: AngularFireAuth,
    private route: Router
  ) { }

  signup(signupForm: HTMLFormElement) {
    const name = signupForm.name;
    const email = signupForm.email;
    const password = signupForm.password;
    const passwordConfirm = signupForm.passwordConfirm;
    const gender = signupForm.gender;

    const newUser = new User(name, email, password, passwordConfirm, gender);

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
               .then(result => {
                 this.route.navigate(['signin']);
               })
               .catch(error => {
                 this.errorMessage = error.message;
               });
  }


}
