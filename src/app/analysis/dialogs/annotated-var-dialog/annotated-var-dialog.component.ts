import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Variant} from '../../../models';


export interface DialogData{
    variant: Variant;
}

@Component({
  selector: 'app-annotated-var-dialog',
  templateUrl: './annotated-var-dialog.component.html',
  styleUrls: ['./annotated-var-dialog.component.scss']
})
export class AnnotatedVarDialogComponent implements OnInit {

  variant: Variant;

  constructor(public dialogRef: MatDialogRef<AnnotatedVarDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.variant = data.variant;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(true);
  }

}