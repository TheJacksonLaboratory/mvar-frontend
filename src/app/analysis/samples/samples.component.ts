import { Component, OnInit, ViewChild} from '@angular/core';
import {Gene, Variant, Sample, Phenotype} from '../../models';
import {SearchService} from '../search.service';
import {PageEvent} from '@angular/material/paginator';
import {MatPaginator, MatTable} from "@angular/material";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material';
import { UploadDialogComponent } from '../../files-nav/upload-dialog/upload-dialog.component';
import { UploadService } from '../../files-nav/upload.service';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({height: '0px', minHeight: '0'})),
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
    pageLength = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100, 500];

    //searchparams
    currSearchParams: any;

    panelStyle: string = 'col-lg-12 col-md-12';
    expandedElement: Sample | null;

    constructor(private searchService: SearchService, public dialog: MatDialog, public uploadService: UploadService) {
    }

  ngOnInit() {

      const params: any = {};
      params.studies = ['mmr', 'mmr_sv']
      this._getSamples(params)

      this.uploadService.isThereSampleChanges.subscribe( value => {
          if (value) {
              this._getSamples(params);
          }
      });
  }


    public onSearchCriteriaChange(searchCriteria: any){

        const params: any = {};

        if (searchCriteria.searchCriteriaList.length > 0) {
            params.selectedItems = searchCriteria.searchCriteriaList;
            this._getSamples(params);
        }else{
            this._getSamples({})
        }

    }


    private _getSamples(params: any) {
      this.currSearchParams = params
      this.searchService.getSamples(params).subscribe(data => {

          let temp = data.samples as Sample[];

          // temp.forEach(variant => {
          //     if (!variant.gene) {variant.gene = new Gene()};
          // });
          this.dataSource = temp;

          this.count = data.sampleCount;
          this.pageLength = this.count;

          console.log('sample count = ' + this.count)
          console.log(this.dataSource);

      });
  }

    doPageChange(pageEvent: any) {

        console.log(pageEvent.pageSize + pageEvent.pageIndex);
        if (this.currSearchParams) {

            if (this.currSearchParams.max != pageEvent.pageSize) {
                this.currSearchParams.offset = 0;
                this.paginator.pageIndex = 0;

                window.scroll(0, 0);
            }
            else {
                this.currSearchParams.offset = pageEvent.pageIndex * pageEvent.pageSize;
            }

            this.currSearchParams.max = pageEvent.pageSize;
            this._getSamples(this.currSearchParams);
        }
    }


    doSomething(element:any){
        console.log(element)

        this.expandedElement = this.expandedElement === element ? null : element
    }


    public openUploadDialog() {
        const dialogRef: UploadDialogComponent = this.dialog.open(UploadDialogComponent, { width: '50%', height: '50%', data:{fileType:'sample', titleText:'Upload Samples Metadata File'} });

    }
}
