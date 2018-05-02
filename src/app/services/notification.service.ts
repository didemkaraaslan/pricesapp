import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { Shoe } from '../interfaces/shoe';
import { ShoeService } from './shoe.service';
import { Alarm } from '../interfaces/Alarm';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import { AlarmService } from './alarm.service';
import { scrapForSale } from '../scraper/scraper';
import { EmailService } from './email.service';
const CronJob = require('cron').CronJob;


@Injectable()
export class NotificationService {

  notificationCollection: AngularFirestoreCollection<Alarm>;
  Alarms: Alarm[];
  success = false;
  newAlarm: Alarm = {
    Email: '',
    ShoeID: '',
    Shoe: null
  };

  constructor(
    private afs: AngularFirestore,
    private shoeService: ShoeService,
    private authService: AuthService,
    private alarmService: AlarmService,
    private emailService: EmailService
  ) {}

  add(ID: string, email: string): boolean {

    this.shoeService.getShoeWithID(ID)
        .subscribe(shoe => {
          this.newAlarm.Email = firebase.auth().currentUser.email;
          this.newAlarm.ShoeID = ID;
          this.newAlarm.Shoe = shoe;

          this.afs.collection('notificationsCollection').doc(shoe.ID)
              .set(this.newAlarm)
              .then(onFulfilled => {
                this.success = true;
              })
              .catch(errors => {
                this.success = false;
              });
        });

        // Set a scheduler to watch price changes on the alarms
        const job = new CronJob('00 32 18 * * 1-5', this.watchAlarms()
          , function () {
            /* This function is executed when the job stops */
            console.log('Job finished');
          },
          true, /* Start the job right now */
          'Europe/Istanbul' /* Time zone of this job. */
        );

        return this.success;
  }

  getAlarmWithId(ID: string): Observable<Alarm[]> {
      this.notificationCollection = this.afs.collection('notificationsCollection', ref => {
        return ref.where('Email', '==', firebase.auth().currentUser.email)
                  .where('ShoeID', '==', ID);
      });
      return this.notificationCollection.valueChanges();
  }

   /*
    * Runs every weekday (Monday through Friday)
    * at 11:30:00 AM. It does not run on Saturday
    * or Sunday.
    */
  watchAlarms() {
    this.alarmService.getAlarms().subscribe(alarms => {
      alarms.forEach(async alarm => {
        const result = await scrapForSale(alarm.Shoe.DetailLink, alarm.Shoe.SalePrice, alarm.Shoe.Seller);
        if (result === true) {

          const options = {
            to: alarm.Email,
            from: 'no-reply@pricetracker.com',
            subject: 'İndirim oldu!',
            html: 'Selam, takip ettiğin ayakkabı indirime girdi.Buradan indirim fiyatını görebilirsin! <strong>'
            + alarm.Shoe.DetailLink + '</strong>',
          };

          // If there is a sale on the alarm then send an email to 
          // the user and delete the alarm.
          this.emailService.sendMail(options);
          this.alarmService.deleteAlarmWithId(alarm.ShoeID);
        }
        console.log(alarm.Email + ' ' + alarm.Shoe.Name + ' ' + result + alarm.Shoe.DetailLink);
      });
    });
  }




}
