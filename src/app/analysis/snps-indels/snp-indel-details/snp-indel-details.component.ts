import { Component, OnInit, Input } from '@angular/core';
import {Variant, Phenotype} from '../../../models';
import {MatDialogRef, MatTable} from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GeneDialogComponent} from '../../dialogs/gene-dialog/gene-dialog.component';
import {StrainDialogComponent} from '../../dialogs/strain-dialog/strain-dialog.component';
import {environment} from '../../../../environments/environment';
import {RouterEvent, Router} from '@angular/router';

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
    ensemblTransUrl = environment.ENSEMBL_TRANSCRIPT_URL;

    dialogRef: any;

    constructor(public dialog: MatDialog, public router: Router) { }

    ngOnInit() {
    // this.phenotypeDataSource = this.variant.sample.phenotypes;

    //     this.router.events
    //         .subscribe(() => {
    //             if (this.dialogRef) {
    //                 this.dialogRef.close();
    //             }
    //         });
    }

    openGeneDialog() {
      console.log("open gene dialog");
        this.dialogRef = this.dialog.open(GeneDialogComponent, {
          width: '50%', height: '50%',
          data: {
              gene: this.variant.gene
          }
      });
    }

    openStrainDialog() {
        console.log("open strain dialog");
        this.dialogRef = this.dialog.open(StrainDialogComponent, {
            width: '50%', height: '50%',
            data: {
                strains: this.variant.strains
            }
        });
    }

    openVariantDialog() {
        console.log("open variant dialog");
        // TODO
        // this.dialogRef = this.dialog.open(VariantDialogComponent, {
        //     width: '80%', height: '80%',
        //     data: {
        //         variant: this.variant
        //     }
        // });
    }

}
