import {Component, Input, OnInit} from '@angular/core';
import {Phenotype, Sample, SampleStatistics} from '../../../models';
import {SearchService} from '../../search.service';
import {MatDialog} from '@angular/material/dialog';
import {StrainDialogComponent} from '../../dialogs/strain-dialog/strain-dialog.component';
import {environment} from '../../../../environments/environment';
import {SampleEditDialogComponent} from '../../dialogs/sample-edit-dialog/sample-edit-dialog.component';
import {AuthenticationService} from '../../../login/authentication.service';

@Component({
    selector: 'app-sample-details',
    templateUrl: './sample-details.component.html',
    styleUrls: ['./sample-details.component.scss']
})
export class SampleDetailsComponent implements OnInit {

    @Input()
    sample: Sample;
    displayedColumns = ['mpTermIdentifier', 'mpTermName', 'samples']
    phenotypeDataSource: Phenotype[] = [];
    sampleStats: SampleStatistics;

    dialogRef: any;

    jaxRegistryUrl = environment.JAX_STRAIN_REGISTRY_URL;
    jaxPhenotypeURL = environment.JAX_MAMMALIAN_PHENOTYPE_URL;

    isUserLoggedIn = false;
    currentUser: any;

    expandStatStatus = false;

    constructor(public dialog: MatDialog, private searchService: SearchService, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.phenotypeDataSource = this.sample.phenotypes;

        this.currentUser = this.authenticationService.currentUserValue;
        if (this.currentUser && this.currentUser.access_token) {
            this.isUserLoggedIn = true;
        } else {
            this.isUserLoggedIn = false;
        }
    }

    loadStats() {
        this.getSampleVariantStats();
        this.getSampleSvVariantStats();
    }

    getSampleVariantStats() {
        console.log('getting var stat data')
        const params: any = {};
        params.selectedItems = [{selectedType: 'sample', selectedValue: this.sample}];
        params.max = 1;
        params.lowQual = true;

        //total count
        this.searchService.queryVariant(params).subscribe(data => {

            this.sample.totalVarCount = data.variantCount;
            console.log(this.sample.totalVarCount);
        });

        //rare variants
        params.rareVar = true;
        this.searchService.queryVariant(params).subscribe(data => {

            this.sample.rareVarCount = data.variantCount;
            console.log(this.sample.rareVarCount);
        });

        //likely pathogenic
        params.rareVar = null;
        params.candidateVar = true;
        this.searchService.queryVariant(params).subscribe(data => {

            this.sample.candidateVarCount = data.variantCount;
            console.log(this.sample.candidateVarCount);
        });

        //confirmed mutations
        params.candidateVar = null;
        params.confirmedVar = true;
        this.searchService.queryVariant(params).subscribe(data => {

            this.sample.confirmedVarCount = data.variantCount;
            console.log(this.sample.confirmedVarCount);
        });

        this.searchService.getSampleStatistics(this.sample.id).subscribe(data => {
            this.sample.sampleStats = data.stats;
            console.log(this.sample.sampleStats)
        });
    }

    getSampleSvVariantStats() {
        console.log('getting sv var stat data')
        const params: any = {};
        params.selectedItems = [{selectedType: 'sample', selectedValue: this.sample}];
        params.max = 1;

        //total count
        this.searchService.querySvVariant(params).subscribe(data => {

            this.sample.totalSvVarCount = data.svVariantCount;
            console.log(this.sample.totalSvVarCount);
        });

        //rare variants
        params.rareVar = true;
        this.searchService.querySvVariant(params).subscribe(data => {

            this.sample.rareSvVarCount = data.svVariantCount;
            console.log(this.sample.rareSvVarCount);
        });

        //likely pathogenic
        params.rareVar = null;
        params.candidateVar = true;
        this.searchService.querySvVariant(params).subscribe(data => {

            this.sample.candidateSvVarCount = data.svVariantCount;
            console.log(this.sample.candidateSvVarCount);
        });

        //confirmed mutations
        params.candidateVar = null;
        params.confirmedVar = true;
        this.searchService.querySvVariant(params).subscribe(data => {

            this.sample.confirmedSvVarCount = data.svVariantCount;
            console.log(this.sample.confirmedSvVarCount);
        });

    }


    openStrainDialog() {
        this.dialogRef = this.dialog.open(StrainDialogComponent, {
            width: '50%', height: '50%',
            data: {
                strain: this.sample.strain
            }
        });
    }

    openEditDialog() {
        this.dialogRef = this.dialog.open(SampleEditDialogComponent, {
            width: '40%', height: '70%',
            data: {
                sample: this.sample
            }
        });
    }

    expandStats(status){
        this.expandStatStatus = status
    }
}
