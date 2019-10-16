import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Strain} from '../../../models';


@Component({
  selector: 'app-strain-dialog',
  templateUrl: './strain-dialog.component.html',
  styleUrls: ['./strain-dialog.component.scss']
})
export class StrainDialogComponent implements OnInit {

  strain: Strain
  constructor(@Inject(MAT_DIALOG_DATA) public data: Strain) {
    this.strain = data.strain

  }

  ngOnInit() {
  }

}
