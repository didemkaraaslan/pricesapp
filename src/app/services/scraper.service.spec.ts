import { TestBed, inject } from '@angular/core/testing';

import { ScraperService } from './scraper.service';

describe('ScraperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScraperService]
    });
  });

  it('should be created', inject([ScraperService], (service: ScraperService) => {
    expect(service).toBeTruthy();
  }));
});
