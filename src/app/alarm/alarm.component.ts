import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlarmDialogComponent } from '../alarm-dialog/alarm-dialog.component';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  showDialog = true;
  showAlarmMessage: boolean;
  animal: string;
  name: string;
  ID: string;

  constructor(private dialog: MatDialog, private routeActivated: ActivatedRoute,
     private notificationService: NotificationService) {
     }

  ngOnInit() {
    this.routeActivated.paramMap.subscribe(params => {
      this.ID = params.get('id');
    });
    this.showAlarmMessage = this.isAlarmSet();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    const dialogRef =  this.dialog.open(AlarmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.notificationService.add(this.ID, data.email);
      this.showAlarmMessage = true;
    });
  }

  isAlarmSet() {
    return this.notificationService.isAlarmSetOnShoe(this.ID);
  }
}
