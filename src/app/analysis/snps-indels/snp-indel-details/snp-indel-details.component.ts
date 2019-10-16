import { Component, OnInit, Input } from '@angular/core';
import {Variant, Sample, Phenotype} from '../../../models';
import {MatTable} from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GeneDialogComponent} from '../../dialogs/gene-dialog/gene-dialog.component';
import {StrainDialogComponent} from '../../dialogs/strain-dialog/strain-dialog.component';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-snp-indel-details',
  templateUrl: './snp-indel-details.component.html',
  styleUrls: ['./snp-indel-details.component.scss']
})
export class SnpIndelDetailsComponent implements OnInit {

    @Input()
    variant: Variant;
    displayedColumns = ['mpTermIdentifier', 'mpTermName', 'samples']
    phenotypeDataSource: Phenotype[] = [];
    dbSNPUrl = environment.NCBI_DBSNP_URL;

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
    this.phenotypeDataSource = this.variant.sample.phenotypes;
    }

    openGeneDialog() {
      console.log("open gene dialog");
      this.dialog.open(GeneDialogComponent, {
          width: '50%', height: '30%',
          data: {
              gene: this.variant.gene
          }
      });
    }

    openStrainDialog() {
        console.log("open strain dialog");
        this.dialog.open(StrainDialogComponent, {
            width: '50%', height: '30%',
            data: {
                strain: this.variant.sample.strain
            }
        });
    }

}
