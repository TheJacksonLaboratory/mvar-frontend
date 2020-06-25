import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Variant, Sample, Phenotype, VariantAnnotation} from '../../../models';
import {MatDialogRef, MatTable} from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GeneDialogComponent} from '../../dialogs/gene-dialog/gene-dialog.component';
import {StrainDialogComponent} from '../../dialogs/strain-dialog/strain-dialog.component';
import {SampleDialogComponent} from '../../dialogs/sample-dialog/sample-dialog.component';
import {environment} from '../../../../environments/environment';
import {RouterEvent, Router} from '@angular/router';
import {AnnotatedVarDialogComponent} from '../../dialogs/annotated-var-dialog/annotated-var-dialog.component';
import {AuthenticationService} from "../../../login/authentication.service";


@Component({
  selector: 'app-snp-indel-details',
  templateUrl: './snp-indel-details.component.html',
  styleUrls: ['./snp-indel-details.component.scss']
})
export class SnpIndelDetailsComponent implements OnInit {

    @Input()
    variant: Variant;
    displayedColumns = ['annotation', 'status', 'updatedBy', 'updateDate', 'notes', 'action']
    phenotypeDataSource: Phenotype[] = [];
    dbSNPUrl = environment.NCBI_DBSNP_URL;
    ensemblTransUrl = environment.ENSEMBL_TRANSCRIPT_URL;

    dialogRef: any;
    isUserLoggedIn = false;
    currentUser: any;

    @ViewChild(MatTable, {static: true}) annoTable: MatTable<any>;

    constructor(public dialog: MatDialog, public router: Router, private authenticationService: AuthenticationService) { }

    ngOnInit() {
    this.phenotypeDataSource = this.variant.sample.phenotypes;

        this.router.events
            .subscribe(() => {
                if (this.dialogRef) {
                    this.dialogRef.close();
                }
            });

        this.currentUser = this.authenticationService.currentUserValue;
        if (this.currentUser && this.currentUser.access_token) {
            this.isUserLoggedIn = true;
        } else {
            this.isUserLoggedIn = false;
        }

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
                strain: this.variant.sample.strain
            }
        });
    }

    openSampleDialog() {
        console.log("open sample dialog");
        this.dialogRef = this.dialog.open(SampleDialogComponent, {
            width: '80%', height: '80%',
            data: {
                sample: this.variant.sample
            }
        });
    }

    openAnnotatedVarDialog(annotation: VariantAnnotation) {
        console.log("open annotated var dialog ");
        console.log (annotation)
        this.dialogRef = this.dialog.open(AnnotatedVarDialogComponent, {
            width: '50%', height: '70%',
            data: {
                variant: this.variant,
                variantAnnotation: annotation,
                svVariant: null,
            }
        });

        this.dialogRef.afterClosed().subscribe( result =>{
            console.log('CLOSING DIALOG')
            console.log(this.variant.variantAnnotations)
            //this.varAnnotaionsDataSource = this.variant.variantAnnotations;

            this.annoTable.renderRows();

        });
    }

}
