import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Shoe } from '../models/shoe';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoeService {

  apiUrl = '/api/products';
 // apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
 
  results: any;

  constructor(private http: HttpClient) { }

  getShoesData(searchTerm:string, size: number, gender: string ): Observable<Shoe[]> {
    return this.http.get<Shoe[]>(this.apiUrl);
          
  }

}
