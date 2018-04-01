import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent {

  range: number;

  constructor(private router: Router) { }

  search(searchTerm: string) {
    this.router.navigate(['/shoes'], {
      queryParams: {
        searchTerm: searchTerm
      }
    });
  }

}
