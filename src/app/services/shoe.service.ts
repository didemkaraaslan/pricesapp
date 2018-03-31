import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Shoe } from '../interfaces/shoe';

@Injectable()
export class ShoeService {

  // apiUrl = 'https://pricesappserver.herokuapp.com/api/shoes';
 // apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;

  shoesCollection: AngularFirestoreCollection<Shoe>;
  shoes: Observable<Shoe[]>;
  filterMax: number;
  filterMin: number;

  constructor(private afs: AngularFirestore) { }

  getShoesData(searchTerm: string, priceRange: string ): Observable<Shoe[]> {
     this.adjustFilter(priceRange);
     console.log(this.filterMax);
     this.shoesCollection = this.afs.collection('shoesCollection', ref => {
       return ref.where('Name', '==', searchTerm)
                 .where('SalePrice', '>=', this.filterMin)
                 .where('SalePrice', '<=', this.filterMax);
     });
     this.shoes = this.shoesCollection.valueChanges();
     return this.shoes;
  }

  adjustFilter(searchTerm: string) {
    if (searchTerm === 'low') {
      this.filterMin = 0;
      this.filterMax = 200;
    } else if (searchTerm === 'optimum') {
      this.filterMin = 200;
      this.filterMax = 500;
    } else if (searchTerm === 'maxiumum') {
      this.filterMin = 500;
      this.filterMax = 1000;
    } else {
      this.filterMin = 0;
      this.filterMax = 10000;
    }
  }

}
