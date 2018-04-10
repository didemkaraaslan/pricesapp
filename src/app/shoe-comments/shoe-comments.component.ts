import { Component, OnInit } from '@angular/core';
import { Comment } from '../interfaces/comment';
import { Shoe } from '../interfaces/shoe';
import { ShoeService } from '../services/shoe.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shoe-comments',
  templateUrl: './shoe-comments.component.html',
  styleUrls: ['./shoe-comments.component.css']
})
export class ShoeCommentsComponent implements OnInit {

  shoe$: Observable<Shoe>;

  constructor(private shoeService: ShoeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const ID = params.get('id');
      this.shoe$ = this.shoeService.getShoeWithID(ID);
    });
  }

  addComment(author: string, content: string) {
  }

}
