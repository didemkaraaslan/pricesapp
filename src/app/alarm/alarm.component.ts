import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlarmDialogComponent } from '../alarm-dialog/alarm-dialog.component';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Alarm } from '../interfaces/Alarm';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  Alarm$: Observable<Alarm[]>;
  showDialog = true;
  ID: string;

  constructor(private dialog: MatDialog, private routeActivated: ActivatedRoute,
     private notificationService: NotificationService) {
     }

  ngOnInit() {
    this.routeActivated.paramMap.subscribe(params => {
      this.ID = params.get('id');
    });

    this.Alarm$ = this.getAlarm();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    const dialogRef =  this.dialog.open(AlarmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.notificationService.add(this.ID, data.email);
    });
  }

  getAlarm(): Observable<Alarm[]> {
    return this.notificationService.getAlarmWithId(this.ID);
  }


}
