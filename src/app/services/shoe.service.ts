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

  constructor(private afs: AngularFirestore) { }

  getShoesData(searchTerm: string, priceRange: string ): Observable<Shoe[]> {
     this.shoesCollection = this.afs.collection('shoesCollection', ref => {
       return ref.where('Name', '==', searchTerm);
     });
     this.shoes = this.shoesCollection.valueChanges();
     return this.shoes;
  }

}
