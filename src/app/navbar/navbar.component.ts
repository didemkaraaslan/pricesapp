import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  User$: Observable<firebase.User>;

  constructor(private authService: AuthService, private router: Router,
    private afAuth: AngularFireAuth) {
    this.User$ = this.afAuth.authState;
  }

  ngOnInit() {

  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  search(searchTerm: string) {
    this.router.navigate(['/shoes'], {
      queryParams: {
        searchTerm: searchTerm
      }
    });
  }
}
