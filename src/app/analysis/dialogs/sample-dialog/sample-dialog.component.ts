import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Sample} from '../../../models';

@Component({
  selector: 'app-sample-dialog',
  templateUrl: './sample-dialog.component.html',
  styleUrls: ['./sample-dialog.component.scss']
})
export class SampleDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Sample) { }

  ngOnInit() {
  }

}
