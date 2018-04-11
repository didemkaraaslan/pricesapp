import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { User } from '../models/user';

@Injectable()
export class UserService {
  usersCollection: AngularFirestoreCollection<Observable<User[]>>;
  user$: Observable<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('usersCollection');
  }

  saveUser(user: User) {
    return this.usersCollection.doc(user.getId())
        .ref.set(Object.assign({}, user));
  }


}
