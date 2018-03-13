import { TestBed, inject } from '@angular/core/testing';

import { ShoeService } from './shoe.service';

describe('ShoeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoeService]
    });
  });

  it('should be created', inject([ShoeService], (service: ShoeService) => {
    expect(service).toBeTruthy();
  }));
});
