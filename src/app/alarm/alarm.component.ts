import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlarmDialogComponent } from '../alarm-dialog/alarm-dialog.component';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent {
  animal: string;
  name: string;

  constructor(private dialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


  const dialogRef =  this.dialog.open(AlarmDialogComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
    data => console.log('Dialog output:', data)
  );
  }
}
