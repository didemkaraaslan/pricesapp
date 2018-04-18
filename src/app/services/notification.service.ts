import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { Shoe } from '../interfaces/shoe';
import { ShoeService } from './shoe.service';
import { Alarm } from '../interfaces/Alarm';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable()
export class NotificationService {

  notificationCollection: AngularFirestoreCollection<Alarm>;
  success = false;
  newAlarm: Alarm = {
    Email: '',
    ShoeID: '',
    Shoe: null
  };

  constructor(
    private afs: AngularFirestore,
    private shoeService: ShoeService,
    private authService: AuthService
  ) { }

  add(ID: string, email: string): boolean {

    this.shoeService.getShoeWithID(ID)
        .subscribe(shoe => {
          this.newAlarm.Email = firebase.auth().currentUser.email;
          this.newAlarm.ShoeID = ID;
          this.newAlarm.Shoe = shoe;

          this.afs.collection('notificationsCollection').doc(this.afs.createId())
              .set(this.newAlarm)
              .then(onFulfilled => {
                this.success = true;
              })
              .catch(errors => {
                this.success = false;
              });
        });
        return this.success;
  }

  getAlarmWithId(ID: string): Observable<Alarm[]> {
      this.notificationCollection = this.afs.collection('notificationsCollection', ref => {
        return ref.where('Email', '==', firebase.auth().currentUser.email)
                  .where('ShoeID', '==', ID);
      });
      return this.notificationCollection.valueChanges();
  }


}
