import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../services/shoe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Shoe } from '../interfaces/shoe';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../services/data.service';
const stringSimilarity = require('string-similarity');

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {

  searchTerm: string;
  priceRange: string;
  shoes: Shoe[];
  shoesFirestore: Shoe[];
  shoe: Shoe;

  currentRate = 0;

  constructor(private shoeService: ShoeService, private dataService: DataService,
     private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.dataService.currentData.subscribe(shoe => this.shoe = shoe);
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
        this.shoes = this.shoesFirestore.filter( shoe => shoe.SalePrice === 180);
        break;
      }
    }
  }



  getShoes(searchTerm: string) {
    this.shoeService.getShoesData(searchTerm)
        .subscribe(result => {
          this.shoesFirestore = result;
          this.shoes = this.shoesFirestore;
          this.similarify(this.shoes);
        });
  }

  showSimilarResults(shoe: Shoe) {
    this.shoe = shoe;
    this.dataService.communicate(shoe);
    this.router.navigate(['/shoe', shoe.Name]);
  }


  similarify(shoes: Shoe[]) {
    shoes.forEach(shoe => {
      shoe.SimilarWith = [];
    });
    let similarity;
    for ( let i = 0; i < shoes.length; i++) {
      for (let k = i + 1; k < shoes.length; k++) {
        similarity = stringSimilarity.compareTwoStrings(shoes[i].BrandName, shoes[k].BrandName);
        if ( similarity >= 0.8) {
          shoes[i].SimilarWith.push(shoes[k]);
          shoes.splice(k, 1);
          k--;
        }
      }
  }

  }
}
