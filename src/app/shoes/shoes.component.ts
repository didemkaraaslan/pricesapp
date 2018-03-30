import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../services/shoe.service';
import { ActivatedRoute } from '@angular/router';
import { Shoe } from '../interfaces/shoe';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {

  searchTerm: string;
  priceRange: string;

  shoes: Shoe[];
  displayedColumns = ['DetailLink', 'name', 'brandname', 'marketprice'];

  constructor(private shoeService: ShoeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('searchTerm');
      this.priceRange = params.get('priceRange');
    });

    this.getShoes(this.searchTerm, this.priceRange);
  }


  getShoes(searchTerm: string, priceRange: string) {
    this.shoeService.getShoesData(searchTerm, priceRange)
        .subscribe(result => {
          this.shoes = result;
          const dataSource = new MatTableDataSource(result);
        } );
  }

}
