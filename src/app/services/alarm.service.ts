import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Alarm } from '../interfaces/Alarm';
import { AuthService } from './auth.service';


@Injectable()
export class AlarmService implements OnInit {
  notificationsCollection: AngularFirestoreCollection<Alarm>;
  Alarms$: Observable<Alarm[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  ngOnInit() {
  }


  getAllAlarms(email: String): Observable<Alarm[]> {
    this.notificationsCollection = this.afs.collection('notificationsCollection', ref => {
      return ref.where('Email', '==', email);
    });
    return this.notificationsCollection.valueChanges();
  }

  getAlarms(): Observable<Alarm[]> {
    this.notificationsCollection = this.afs.collection('notificationsCollection', ref => {
      return ref;
    });
    return this.notificationsCollection.valueChanges();
  }

  deleteAlarmWithId(ID: string) {
    this.afs.collection('notificationsCollection')
            .doc(ID).delete();
  }

}
