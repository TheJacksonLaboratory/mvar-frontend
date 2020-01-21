import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Sample} from '../../models';
import {SearchService} from '../search.service';
import {MatDialog, MatPaginator} from "@angular/material";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UploadDialogComponent} from '../../files-nav/upload-dialog/upload-dialog.component';
import {UploadService} from '../../files-nav/upload.service';
import {MatSort} from '@angular/material/sort';
import {HelpDialogComponent} from '../dialogs/help-dialog/help-dialog.component';
import {SpinnerDialogComponent} from '../../components/spinner-dialog/spinner-dialog.component';


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
export class SamplesComponent implements OnInit, AfterViewInit {

    @ViewChild('paginator', {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    //Table items
    displayedColumns = ['id', 'sampleName', 'study', 'strainName', 'chrLinkage', 'inheritance', 'phenotypes']; //'genotype', 'chrLinkage',
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

    spinnerDialogRef: any;

    constructor(private searchService: SearchService, public dialog: MatDialog, public uploadService: UploadService) {

        const params: any = {};
        //params.studies = ['mmr', 'mmr_sv']

        this.uploadService.isThereSampleChanges.subscribe( value => {
            if (value) {
                this._getSamples(params);
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => {

            this.currSearchParams.sortBy = this.sort.active;
            this.currSearchParams.sortDirection = this.sort.direction;
            this.currSearchParams.offset = 0;
            this.paginator.pageIndex = 0;

            if (this.currSearchParams.selectedItems) {
                if (this.sort.active && this.currSearchParams.selectedItems.length > 0) {
                    this._getSamples(this.currSearchParams)
                }
            }
        });

        if (! this.currSearchParams.selectedItems && ! this.currSearchParams.study){
            console.log(' no selected items')
            this.currSearchParams.study = 'All'
            this._getSamples(this.currSearchParams)
        }
    }

    public onSearchCriteriaChange(searchCriteria: any){
        const params: any = {};
        this.currSearchParams.offset = 0;
        this.paginator.pageIndex = 0;
        this.clearSort();

        if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0 ) || searchCriteria.study) {
            this.currSearchParams.selectedItems = searchCriteria.selectedItems;
        } else {
            searchCriteria.study = 'All'
        }

        this._getSamples(this.currSearchParams);
    }


    private clearSort() {
        this.sort.sort({id: '', start: 'asc', disableClear: false});
    }

    private _getSamples(params: any) {
      // this.currSearchParams = params
      this.openSpinnerDialog()
      this.searchService.getSamples(params).subscribe(data => {

          this.dataSource = data.samples;
          this.count = data.sampleCount;
          this.pageLength = this.count;

          console.log('sample count = ' + this.count)

          this.spinnerDialogRef.close();

        }, (error) => {
          this.spinnerDialogRef.close();
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

        this.searchService.getSampleStatistics(element.id).subscribe(data => {
            element.sampleStats = data.stats;
            console.log(element.sampleStats)
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

    openHelpDialog() {
        console.log("open help dialog");
        const dialogRef = this.dialog.open(HelpDialogComponent, {
            width: '50%', height: '50%',
            data: {
                helpType: 'sampleGeneral'
            }
        });
    }

    openSpinnerDialog() {
        console.log("open spinner dialog");
        this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
            panelClass: 'transparent',
            disableClose: true
        });
    }
}
