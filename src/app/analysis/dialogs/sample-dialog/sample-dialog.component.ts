import {Component, OnInit, Inject, ViewChild, OnChanges, AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Sample} from '../../../models';


export interface DialogData {
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

    constructor(public dialogRef: MatDialogRef<SampleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.sample = data.sample
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.sampleDetails.loadStats()
    }

    closeDialog() {
        this.dialogRef.close(true);
    }

}
