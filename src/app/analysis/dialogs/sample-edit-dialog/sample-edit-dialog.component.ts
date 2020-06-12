import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Sample} from '../../../models';

export interface DialogData {
    sample: Sample;
}

@Component({
    selector: 'app-sample-edit-dialog',
    templateUrl: './sample-edit-dialog.component.html',
    styleUrls: ['./sample-edit-dialog.component.scss']
})
export class SampleEditDialogComponent implements OnInit {

    sample: Sample;

    constructor(public dialogRef: MatDialogRef<SampleEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.sample = data.sample
    }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close(true);
    }

    close() {
        this.dialogRef.close(true);
    }
}
