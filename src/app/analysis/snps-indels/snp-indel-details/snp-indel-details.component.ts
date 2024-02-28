import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Variant, Transcript, Strain} from '../../../models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {GeneDialogComponent} from '../../dialogs/gene-dialog/gene-dialog.component';
import {StrainDialogComponent} from '../../dialogs/strain-dialog/strain-dialog.component';
import {environment} from '../../../../environments/environment';
import { Router} from '@angular/router';

@Component({
  selector: 'app-snp-indel-details',
  templateUrl: './snp-indel-details.component.html',
  styleUrls: ['./snp-indel-details.component.scss']
})
export class SnpIndelDetailsComponent implements OnInit {

    @ViewChild('transcriptPaginator', {static: true}) transcriptPaginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) transcriptSort: MatSort;
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
    mgiGeneUrl = environment.MGI_GENE_URL;
    ncbiIdUrl = environment.NCBI_ID_URL;
    rsIdUrl = environment.EVA_ID_URL;

    dialogRef: any;

    constructor(public dialog: MatDialog, public router: Router) { }

    ngOnInit() {
        this.strainDataSource = this.variant.strains;

        const dnaHGVS = this.variant.dnaHgvsNotation.split(',');
        const proteinHGVS = this.variant.proteinHgvsNotation.split(',');
        const jannovarAnnotation = this.variant.functionalClassCodes.split(',');
        const impact = this.variant.impacts.split(',');

        this.variant.transcripts.forEach((transcript, i) => {
            transcript.dnaHGVS = dnaHGVS[i];
            transcript.proteinHGVS = proteinHGVS[i];
            transcript.annotation = jannovarAnnotation[i];
            transcript.impact = impact[i];
        });

        this.transcriptDataSource = this.variant.transcripts;

        this.transcriptPageLength = this.variant.transcripts.length;
        this.transcriptPaginator.pageIndex = 0;
    }

    openGeneDialog() {
        this.dialogRef = this.dialog.open(GeneDialogComponent, {
          width: '50%', height: '50%',
          data: {
              gene: this.variant.gene
          }
      });
    }

    openStrainDialog() {
        this.dialogRef = this.dialog.open(StrainDialogComponent, {
            width: '50%', height: '50%',
            data: {
                strains: this.variant.strains
            }
        });
    }

    /**
     * TODO Will be used when a VariantDialogComponent is made
     */
    openVariantDialog() {
        // this.dialogRef = this.dialog.open(VariantDialogComponent, {
        //     width: '80%', height: '80%',
        //     data: {
        //         variant: this.variant
        //     }
        // });
    }

    /**
     * TODO Called when a transcript page changes
     * @param pageEvent
     */
    doTranscriptPageChange(pageEvent: any) {


    }

    /**
     * TODO Called when a strain page changes
     * @param pageEvent
     */
    doStrainPageChange(pageEvent: any) {


    }

}
