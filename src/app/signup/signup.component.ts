import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorMessage = '';

  constructor(private authService: AuthService, private route: Router) { }

  signup(signupForm: HTMLFormElement) {
    const name = signupForm.name;
    const email = signupForm.email;
    const password = signupForm.password;
    const passwordConfirm = signupForm.passwordConfirm;
    const gender = signupForm.gender;

    const newUser = new User(name, email, password, passwordConfirm, gender);

    this.authService.createUserWithEmailAndPassword(email, password)
               .then(result => {
                 this.route.navigate(['signin']);
               })
               .catch(error => {
                 this.errorMessage = error.message;
               });
  }


}
