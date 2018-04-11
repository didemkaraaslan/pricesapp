import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService, private router: Router) {}

  signOut() {
    this.authService.signOut();
  }

  search(searchTerm: string) {
    this.router.navigate(['/shoes'], {
      queryParams: {
        searchTerm: searchTerm
      }
    });
  }
}
