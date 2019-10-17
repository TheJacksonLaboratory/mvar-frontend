import { Component, OnInit, Inject, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Sample} from '../../../models';


export interface DialogData{
    sample: Sample;
}

@Component({
  selector: 'app-sample-dialog',
  templateUrl: './sample-dialog.component.html',
  styleUrls: ['./sample-dialog.component.scss']
})
export class SampleDialogComponent implements OnInit, AfterViewInit {

  @ViewChild('sample_details', {static: true}) sampleDetails;
  sample: Sample;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.sample = data.sample
  }

  ngOnInit() {
    console.log("init sample dialog")
  }

  // ngOnChanges(){
  //   this.sampleDetails.loadStats()
  // }

  ngAfterViewInit(){
      this.sampleDetails.loadStats()
  }

}
