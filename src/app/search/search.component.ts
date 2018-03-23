import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ShoeService } from '../services/shoe.service';
import { Shoe } from '../interfaces/shoe';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {

  shoes: Shoe[];

  searchTerm: string = '';
  size: number;
  gender: string;

  submitted: boolean = false;


  constructor(private shoeService: ShoeService ) { }
  
  ngOnInit() {
  }

  onSubmit(searchForm): void {
    this.submitted = true;
    this.searchTerm = searchForm.searchTerm;
    this.gender = searchForm.gender;
    this.size = searchForm.size;

    this.getShoes(this.searchTerm, this.size, this.gender);
  }

  getShoes(searchTerm: string, size: number, gender: string,) {
    this.shoeService.getShoesData(searchTerm, size, gender)
        .subscribe(result => this.shoes = result );
        
  }

}
