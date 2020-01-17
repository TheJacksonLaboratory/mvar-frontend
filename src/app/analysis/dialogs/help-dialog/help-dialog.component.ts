import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    helpType: string;
}

@Component({
    selector: 'app-help-dialog',
    templateUrl: './help-dialog.component.html',
    styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent implements OnInit {

    helpType: string;

    constructor(public dialogRef: MatDialogRef<HelpDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.helpType = data.helpType;
    }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close(true);
    }

}
