import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../services/shoe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Shoe } from '../interfaces/shoe';
import { MatTableDataSource } from '@angular/material/table';
const stringSimilarity = require('string-similarity');

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {

  searchTerm: string;
  priceRange: string;
  shoes: Shoe[] = [];
  shoesFirestore: Shoe[];
  shoe: Shoe;

  currentRate = 0;

  constructor(private shoeService: ShoeService,
     private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('searchTerm');
      this.getShoes(this.searchTerm);
    });
  }

  filter(f: string) {
    switch (f) {
      case '1': {
        this.shoes = this.shoesFirestore.filter( shoe => shoe.SalePrice >= 150);
        break;
      }
      case '2': {
        this.shoes = this.shoesFirestore.filter( shoe => shoe.SalePrice < 150);
        break;
      }
      case '3': {
        this.shoes = this.shoesFirestore.filter( shoe => shoe.SimilarWith.length > 3);
        break;
      }
    }
  }



  getShoes(searchTerm: string) {
    this.shoeService.getShoesData(searchTerm)
        .subscribe(result => {
          this.shoesFirestore = result;
          this.shoes = this.shoesFirestore;
        });
  }

  showDetailsPage(shoe: Shoe) {
    this.router.navigate(['/shoes', shoe.ID]);
  }

}
