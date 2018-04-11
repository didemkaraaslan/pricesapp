import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorMessage = '';

  constructor(private authService: AuthService, private userService: UserService, private route: Router) { }

  signup(signupForm: HTMLFormElement) {
    const name = signupForm.name;
    const email = signupForm.email;
    const password = signupForm.password;
    const passwordConfirm = signupForm.passwordConfirm;
    const gender = signupForm.gender;


    this.authService.createUserWithEmailAndPassword(email, password, name)
               .then(firebaseUser => {
                 const newUser = new User(firebaseUser.uid, name, email, gender);

                 this.userService.saveUser(newUser);
                 this.authService.updateProfile(firebaseUser, name);
                 this.route.navigate(['signin']);
               })
               .catch(error => {
                 this.errorMessage = error.message;
               });
  }


}
