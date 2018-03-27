import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ShoeService } from '../services/shoe.service';
import { Shoe } from '../interfaces/shoe';
import { Router } from '@angular/router';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent {

  constructor(private shoeService: ShoeService, private router: Router) { }

  onSubmit(searchTerm: string, size: number, gender: string) {

    this.router.navigate(['/shoes'], {
      queryParams: {
        searchTerm: searchTerm,
        size: size,
        gender: gender
      }
    });
  }

}
