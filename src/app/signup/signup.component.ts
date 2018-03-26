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

  constructor(
    private afAuth: AngularFireAuth,
    private route: Router
  ) { }

  signup(signupForm: HTMLFormElement) {
    let name = signupForm.name;
    let email = signupForm.email;
    let password = signupForm.password;
    let passwordConfirm = signupForm.passwordConfirm;
    let gender = signupForm.gender;

    let newUser = new User(name, email, password, passwordConfirm, gender);

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
               .then(result => {
                
               })
               .catch(errors => {
                 console.log(errors);
               })
  }


}
