import { Component, OnInit, Input} from '@angular/core';
import { Shoe } from '../interfaces/shoe';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shoe-details',
  templateUrl: './shoe-details.component.html',
  styleUrls: ['./shoe-details.component.css']
})
export class ShoeDetailsComponent implements OnInit {
  shoe: Shoe;
  cheapestShoe: Shoe;
  sortedShoes: Shoe[];
  currentRate = 3;
  numberOfComments = 25;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentData.subscribe(shoe => this.shoe = shoe);
    this.comparePrices();
  }

  comparePrices() {
    const shoe = this.shoe;
    if (shoe.SimilarWith.length > 0 ) {
      this.sortedShoes = shoe.SimilarWith.sort((f, s) => f.SalePrice - s.SalePrice );
      this.cheapestShoe = this.sortedShoes[0];
    }
  }

}
