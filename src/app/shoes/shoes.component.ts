import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../services/shoe.service';
import { ActivatedRoute } from '@angular/router';
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
  shoes: Shoe[];
  shoesFirestore: Shoe[];

  currentRate = 0;

  constructor(private shoeService: ShoeService, private route: ActivatedRoute) {}

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
        this.shoes = this.shoesFirestore.filter( shoe => shoe.SalePrice === 180);
        break;
      }
    }
  }



  getShoes(searchTerm: string) {
    /*
    this.shoeService.getShoesData(searchTerm)
        .subscribe(result => {
          this.shoes = result;
        });
   */ 
        this.shoesFirestore = [
          {
            'Image': 'https://img-sportive.mncdn.com/mnresize/256/256/media/catalog/product/s/a/sa17le042-520_1_1.jpg',
            'SalePrice': 200,
            'MarketPrice': 39,
            'Seller': 'green',
            'Name': 'Ford Alvarez',
            'BrandName': 'Marianne Es',
            'DetailLink': 'http://placehold.it/32x32'
          },
          {
            'Image': 'https://img-trendyol.mncdn.com//Assets/ProductImages/oa/47/2107844/1/4057291439657_2_org.jpg',
            'SalePrice': 26,
            'MarketPrice': 21,
            'Seller': 'green',
            'Name': 'Hart Deleon',
            'BrandName': 'Marianne Compton',
            'DetailLink': 'http://placehold.it/32x32'
          },
          {
            'Image': 'https://img-sportive.mncdn.com/mnresize/256/256/media/catalog/product/b/w/bw0416_1.jpg',
            'SalePrice': 180,
            'MarketPrice': 33,
            'Seller': 'green',
            'Name': 'Marianne Pacheco',
            'BrandName': 'Marianne Koch',
            'DetailLink': 'http://placehold.it/32x32'
          },
          {
            'Image': 'https://img-sportive.mncdn.com/mnresize/256/256/media/catalog/product/s/a/sa27lk001-500_1.jpg',
            'SalePrice': 37,
            'MarketPrice': 28,
            'Seller': 'blue',
            'Name': 'Aurora Gutierrez',
            'BrandName': 'Angelica Woods',
            'DetailLink': 'http://placehold.it/32x32'
          },
          {
            'Image': 'https://img-trendyol.mncdn.com//Assets/ProductImages/oa/76/1145528/1/4057283664548_1_org.jpg',
            'SalePrice': 40,
            'MarketPrice': 37,
            'Seller': 'blue',
            'Name': 'Delgado Robinson',
            'BrandName': 'Molina Mckay',
            'DetailLink': 'http://placehold.it/32x32'
          }
        ];

        this.shoes = this.shoesFirestore;

        this.similarify(this.shoes);
  }

  similarify(shoes: Shoe[]) {
    shoes.forEach(shoe => {
      shoe.SimilarWith = [];
    });
    for ( let i = 0; i < shoes.length; i++) {
      for (let k = i + 1; k < shoes.length; k++) {
        let similarity = stringSimilarity.compareTwoStrings(shoes[i].BrandName, shoes[k].BrandName);
        console.log(shoes[i].BrandName + '  -  ' + shoes[k].BrandName + '  -  ' + similarity);
        if ( similarity >= 0.3) {
          shoes[i].SimilarWith.push(shoes[k]);
          shoes.splice(k, 1);
          k--;
        }
      }
  }
  console.log(shoes);
  }
}
