import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Variant, Transcript, Strain} from '../../../models';
import {MatDialogRef, MatPaginator, MatSort, MatTable} from '@angular/material';
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

    @ViewChild('transcriptPaginator', {static: true}) transcriptPaginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) transcriptSort: MatSort;
    //@ViewChild('strainPaginator', {static: true}) strainPaginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) strainSort: MatSort;

    @Input()
    variant: Variant;
    transcriptDisplayedColumns = ['id', 'mRNAid', 'dnaHGVS', 'proteinHGVS', 'annotation', 'impact']
    transcriptDataSource: Transcript[] = [];

    strainDisplayedColumns = ['identifier', 'name', 'attributes']
    strainDataSource: Strain[] = [];
    // MatPaginator Inputs
    transcriptPageLength = 0;
    transcriptPageSize = 10;
    strainPageLength = 0;
    strainPageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100];
    
    mgiStrainUrl = environment.MGI_STRAIN_URL;
    ensemblTransUrl = environment.ENSEMBL_TRANSCRIPT_URL;
    sequenceOntologyUrl = environment.SEQUENCE_ONTOLOGY_URL;
    sangerSourceUrl = environment.SANGER_SOURCE_URL;

    dialogRef: any;

    constructor(public dialog: MatDialog, public router: Router) { }

    ngOnInit() {
        this.strainDataSource = this.variant.strains;
        
        const dnaHGVS = this.variant.dnaHgvsNotation.split(",");
        const proteinHGVS = this.variant.proteinHgvsNotation.split(",");
        const jannovarAnnotation = this.variant.functionalClassCodes.split(",");
        const impact = this.variant.impacts.split(",");

        this.variant.transcripts.forEach((transcript, i) => {
            transcript.dnaHGVS = dnaHGVS[i];
            transcript.proteinHGVS = proteinHGVS[i];
            transcript.annotation = jannovarAnnotation[i];
            transcript.impact = impact[i];
        });

        this.transcriptDataSource = this.variant.transcripts;

        this.transcriptPageLength = this.variant.transcripts.length;
        //this.strainPageLength = this.variant.strains.length;
        this.transcriptPaginator.pageIndex = 0;
        //this.strainPaginator.pageIndex = 0;
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

    doTranscriptPageChange(pageEvent: any) {

        
    }

    doStrainPageChange(pageEvent: any) {

        
    }

}
