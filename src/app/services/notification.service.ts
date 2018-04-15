import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { Shoe } from '../interfaces/shoe';
import { ShoeService } from './shoe.service';
import { Alarm } from '../interfaces/Alarm';

@Injectable()
export class NotificationService {
  success = false;
  isAlarmExists = false;
  alarm: Alarm = {
    Email: '',
    Shoe: null
  };

  constructor(private afs: AngularFirestore, private shoeService: ShoeService) { }

  add(ID: string, email: string): boolean {
    console.log(email);
    this.shoeService.getShoeWithID(ID)
        .subscribe(shoe => {

          this.alarm.Email = email;
          this.alarm.Shoe = shoe;

          this.afs.collection('notificationsCollection').doc(ID)
              .set(this.alarm)
              .then(onFulfilled => {
                this.success = true;
              })
              .catch(errors => {
                this.success = false;
              });
        });
        return this.success;
  }

  isAlarmSetOnShoe(ID: string) {
      this.afs.collection('notificationsCollection')
        .doc(ID).ref.get()
        .then(doc => {
          if (doc.exists) {
            this.isAlarmExists = true;
          } else {
            this.isAlarmExists = false;
          }
        });
    return this.isAlarmExists;
  }

}
