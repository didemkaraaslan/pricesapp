import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScraperService } from '../services/scraper.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {

  ngOnInit() {
  // this.scraperService.scrape();
  }

  constructor(private scraperService: ScraperService, private router: Router) { }

  search(searchTerm: string) {
    this.router.navigate(['/shoes'], {
      queryParams: {
        searchTerm: searchTerm
      }
    });
  }

}
