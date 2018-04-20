import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Alarm } from '../interfaces/Alarm';
import { AlarmService } from '../services/alarm.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-alarm-details',
  templateUrl: './alarm-details.component.html',
  styleUrls: ['./alarm-details.component.css']
})
export class AlarmDetailsComponent implements OnInit {
  Alarms$: Observable<Alarm[]>;

  constructor(private alarmService: AlarmService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.User$.subscribe(firebaseUser => {
      this.Alarms$ = this.alarmService.getAllAlarms(firebaseUser.email);
    });
  }

}
