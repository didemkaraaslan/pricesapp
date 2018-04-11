import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  errorMessage: string;

  constructor(private authService: AuthService, private route: Router) {}

  signin(email: string, password: string) {
    this.authService.signInWithEmailAndPassword(email, password)
        .then(result => {
          this.route.navigate(['/shoes']);
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
  }

}
