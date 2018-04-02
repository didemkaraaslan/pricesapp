import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

export class ResetpasswordComponent {
  errorMessage: string;

  constructor(private authService: AuthService, private route: Router) {}

  resetPassword(email: string) {
    this.authService.sendPasswordResetEmail(email)
        .then(result => {
          this.route.navigate(['/signin']);
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
  }

}
