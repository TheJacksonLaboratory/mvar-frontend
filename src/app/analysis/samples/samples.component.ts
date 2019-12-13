import {Component, OnInit, ViewChild} from '@angular/core';
import {Sample} from '../../models';
import {SearchService} from '../search.service';
import {MatDialog, MatPaginator} from "@angular/material";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UploadDialogComponent} from '../../files-nav/upload-dialog/upload-dialog.component';
import {UploadService} from '../../files-nav/upload.service';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class SamplesComponent implements OnInit {

    @ViewChild('paginator', {static: true}) paginator: MatPaginator;

    //Table items
    displayedColumns = ['id', 'study', 'researcher', 'jaxStrainId', 'inheritance', 'genotype', 'chrLinkage', 'strainOfOrigin', 'phenotypes'];
    dataSource: Sample[] = [];
    count: number;

    // MatPaginator Inputs
    pageLength = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100];

    //searchparams
    currSearchParams: any = {};

    panelStyle: string = 'col-lg-12 col-md-12';
    expandedElement: Sample | null;

    constructor(private searchService: SearchService, public dialog: MatDialog, public uploadService: UploadService) {

        const params: any = {};
        params.studies = ['mmr', 'mmr_sv']

        this.uploadService.isThereSampleChanges.subscribe( value => {
            if (value) {
                this._getSamples(params);
            }
        });
    }

    ngOnInit() {
    }

    public onSearchCriteriaChange(searchCriteria: any){
        const params: any = {};

        if (searchCriteria.selecteItems && searchCriteria.selecteItems.length > 0) {
            this.currSearchParams.selectedItems = searchCriteria.selecteItems;
        }

        this.currSearchParams.offset = 0;
        this.paginator.pageIndex = 0;
        this._getSamples(this.currSearchParams);
    }


    private _getSamples(params: any) {
      // this.currSearchParams = params
      this.searchService.getSamples(params).subscribe(data => {

          this.dataSource = data.samples;
          this.count = data.sampleCount;
          this.pageLength = this.count;

          console.log('sample count = ' + this.count)

      });
  }

    doPageChange(pageEvent: any) {

        console.log(pageEvent.pageSize + pageEvent.pageIndex);
        if (this.currSearchParams) {
            console.log("max:" + this.currSearchParams.max)
            this.currSearchParams.offset = pageEvent.pageIndex * pageEvent.pageSize;
            this.currSearchParams.max = pageEvent.pageSize;
            this._getSamples(this.currSearchParams);
        }
    }


    expandCollapse(element:any){

        this.expandedElement = this.expandedElement === element ? null : element

        if (this.expandedElement){
            this.getSampleVariantStats(element);
            this.getSampleSvVariantStats(element);
        }
    }

    getSampleVariantStats(element: any){
        const params: any = {};
        params.selectedItems = [{selectedType: 'sample', selectedValue: element}];
        params.max = 1;

        //total count
        this.searchService.queryVariant(params).subscribe( data => {

            element.totalVarCount = data.variantCount;
        });

        //rare variants
        params.rareVar = true;
        this.searchService.queryVariant(params).subscribe( data => {

            element.rareVarCount = data.variantCount;
        });

        //likely pathogenic
        params.rareVar = null;
        params.candidateVar = true;
        this.searchService.queryVariant(params).subscribe( data => {

            element.candidateVarCount = data.variantCount;
        });

        //confirmed mutations
        params.candidateVar = null;
        params.confirmedVar = true;
        this.searchService.queryVariant(params).subscribe( data => {

            element.confirmedVarCount = data.variantCount;
        });
    }

    getSampleSvVariantStats(element: any) {

        const params: any = {};
        params.selectedItems = [{selectedType: 'sample', selectedValue: element}];
        params.max = 1;

        //total count
        this.searchService.querySvVariant(params).subscribe( data => {

            element.totalSvVarCount = data.svVariantCount;
        });

        //rare variants
        params.rareVar = true;
        this.searchService.querySvVariant(params).subscribe( data => {

            element.rareSvVarCount = data.svVariantCount;
        });

        //likely pathogenic
        params.rareVar = null;
        params.candidateVar = true;
        this.searchService.querySvVariant(params).subscribe( data => {

            element.candidateSvVarCount = data.svVariantCount;
        });

        //confirmed mutations
        params.candidateVar = null;
        params.confirmedVar = true;
        this.searchService.querySvVariant(params).subscribe( data => {

            element.confirmedSvVarCount = data.svVariantCount;
        });
    }

    public openUploadDialog() {
        const dialogRef = this.dialog.open(UploadDialogComponent, { width: '50%', height: '50%', data:{fileType:'sample', titleText:'Upload Samples Metadata File'} });

    }
}
