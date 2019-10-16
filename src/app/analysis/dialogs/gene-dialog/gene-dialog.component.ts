import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Gene} from '../../../models';

@Component({
  selector: 'app-gene-dialog',
  templateUrl: './gene-dialog.component.html',
  styleUrls: ['./gene-dialog.component.scss']
})
export class GeneDialogComponent implements OnInit {

  gene: Gene
  constructor(@Inject(MAT_DIALOG_DATA) public data: Gene) {
    this.gene = data.gene
  }

  ngOnInit() {
  }

}
