import { Component, OnInit, Input} from '@angular/core';
import { Shoe } from '../interfaces/shoe';
import { ActivatedRoute } from '@angular/router';
import { ShoeService } from '../services/shoe.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shoe-details',
  templateUrl: './shoe-details.component.html',
  styleUrls: ['./shoe-details.component.css']
})
export class ShoeDetailsComponent implements OnInit {
  shoe$: Observable<Shoe>;
  currentRate = 0;
  numberOfComments = 25;
  ID: string;

  constructor(private shoeService: ShoeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('id');
      this.shoe$ = this.shoeService.getShoeWithID(this.ID);
    });
  }

  rateShoe(newRate) {
    this.shoeService.rateShoe(this.ID, newRate);
  }



}
