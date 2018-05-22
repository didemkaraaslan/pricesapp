import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Comment } from '../interfaces/comment';
import { Shoe } from '../interfaces/shoe';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoeService {

  shoesCollection: AngularFirestoreCollection<Shoe>;
  shoeDocument: AngularFirestoreDocument<Shoe>;
  shoes: Observable<Shoe[]>;
  shoe: Observable<Shoe>;
  customShoe: Shoe;
  snapshot: any;
  comments: Comment[];

  constructor(private afs: AngularFirestore) { }

  getShoesData(searchTerm: string): Observable<Shoe[]> {
    this.shoesCollection = this.afs.collection('shoesCollection', ref => {
      return ref.where('Name', '==', searchTerm);
  });

    this.shoes = this.shoesCollection.valueChanges();
    return this.shoes;
  }

  getShoeWithID(ID: string): Observable<Shoe> {
    this.shoeDocument = this.afs.collection('shoesCollection').doc(ID);
    this.shoe = this.shoeDocument.valueChanges();
    return this.shoe;
  }


  addComment(ID: string, comment: Comment) {
    this.shoeDocument = this.afs.collection('shoesCollection').doc(ID);
    this.shoeDocument.ref
      .get()
      .then(doc => {
        if (doc.exists) {
          const updateShoe = doc.data();

          this.comments = doc.get('Comments');
          this.comments.push(comment);

          updateShoe.Comments = this.comments;

          doc.ref.update(updateShoe)
             .then()
             .catch(error => {
                console.log(error);
             });
        }

      })
      .catch(error => {
        console.log(error);
      });
  }

  rateShoe(ID: string, newRate: number) {
    this.afs.collection('shoesCollection').doc(ID)
    .update({
      RateValue: newRate
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
  }

}
