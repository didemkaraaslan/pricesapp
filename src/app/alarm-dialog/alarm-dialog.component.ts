import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alarm-dialog',
  templateUrl: './alarm-dialog.component.html',
  styleUrls: ['./alarm-dialog.component.css']
})

export class AlarmDialogComponent implements OnInit {

  form: FormGroup;
  email: string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<AlarmDialogComponent>
  ) {}

  ngOnInit() {
      this.form = this.fb.group({
          email: [this.email, []],
      });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
