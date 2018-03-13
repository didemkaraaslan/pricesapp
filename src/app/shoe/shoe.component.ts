import { Component, OnInit, Input } from '@angular/core';
import { ShoeService } from '../services/shoe.service';
import { Shoe } from '../models/shoe' ;

@Component({
  selector: 'app-shoe',
  templateUrl: './shoe.component.html',
  styleUrls: ['./shoe.component.css']
})
export class ShoeComponent implements OnInit {

  @Input() shoes: Shoe[];

  constructor(private shoeService: ShoeService) { }

  ngOnInit() {
  }

}
