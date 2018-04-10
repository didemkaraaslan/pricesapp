import { Component, OnInit } from '@angular/core';
import { Comment } from '../interfaces/comment';
import { DataService } from '../services/data.service';
import { Shoe } from '../interfaces/shoe';

@Component({
  selector: 'app-shoe-comments',
  templateUrl: './shoe-comments.component.html',
  styleUrls: ['./shoe-comments.component.css']
})
export class ShoeCommentsComponent implements OnInit {

  shoe: Shoe;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentData.subscribe( shoe => this.shoe = shoe );
  }

  addComment(author: string, content: string) {
    this.shoe.Comments.push({
      author: author,
      content: content
    });
  }

}
