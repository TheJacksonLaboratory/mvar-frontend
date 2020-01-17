import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Gene} from '../../../models';


export interface DialogData {
    gene: Gene;
}

@Component({
    selector: 'app-gene-dialog',
    templateUrl: './gene-dialog.component.html',
    styleUrls: ['./gene-dialog.component.scss']
})
export class GeneDialogComponent implements OnInit {

    gene: Gene

    constructor(public dialogRef: MatDialogRef<GeneDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.gene = data.gene
    }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close(true);
    }

}
