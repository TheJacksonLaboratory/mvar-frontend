import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {Gene, SvVariant, Variant} from '../../models';
import {SearchService} from '../search.service';
import {PageEvent} from '@angular/material/paginator';
import {MatPaginator, MatTable} from "@angular/material";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-structural-var',
  templateUrl: './structural-var.component.html',
  styleUrls: ['./structural-var.component.scss']
})
export class StructuralVarComponent implements OnInit {


    @ViewChild('varPaginator', {static: true}) varPaginator: MatPaginator;

    //Table items
    displayedColumns = ['svType', 'startPos', 'endPos', 'svLength', 'filter', 'varFreq', 'mutantCandidate', 'sampleId'];
    svVarDataSource: SvVariant[] = [];
    varCount: number;

    // MatPaginator Inputs
    pageLength = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100, 500];

    showVarFilters = false;

    //searchparams
    currSearchParams: any = {}

    constructor(private searchService: SearchService, private route: ActivatedRoute) {
    }

    ngOnInit() {

        const params: any = {};

        this.route.paramMap.subscribe(paramsIn => {
            console.log(paramsIn.get('sample'));

            const sample = paramsIn.get('sample');
            if (sample) {

                this.currSearchParams.selectedItems = [{
                    selectedType: 'sample',
                    selectedValue: {sampleId: sample},
                    displayedValue: paramsIn.get('sample')
                }];
            }

            const candidateVar = paramsIn.get('candidateVar');
            if (candidateVar) {
                this.currSearchParams.candidateVar = true;
            }

            const rareVar = paramsIn.get('rareVar');
            if (rareVar) {
                this.currSearchParams.rareVar = true;
            }

            const confirmedVar = paramsIn.get('confirmedVar');
            if (confirmedVar) {
                this.currSearchParams.confirmedVar = true;
            }
        });

        this._queryVariants(this.currSearchParams);
    }


    public onSearchCriteriaChange(searchCriteria: any){

        const params: any = {};

        if (searchCriteria.selectedItems.length > 0) {
            this.currSearchParams.selectedItems = searchCriteria.selectedItems;
        }

        this._queryVariants(this.currSearchParams);

    }

    private _queryVariants(params: any) {

        this.searchService.querySvVariant(params).subscribe(data => {

            this.svVarDataSource = data.svVariants as SvVariant[];
            this.varCount = data.svVariantCount;
            this.pageLength = this.varCount;

            console.log('var count = ' + this.varCount)
            console.log(this.svVarDataSource);

        });
    }

    doPageChange(pageEvent: any) {

        console.log(pageEvent.pageSize + pageEvent.pageIndex);
        if (this.currSearchParams) {

            if (this.currSearchParams.max != pageEvent.pageSize) {
                this.currSearchParams.offset = 0;
                this.varPaginator.pageIndex = 0;

                window.scroll(0, 0);
            }
            else {
                this.currSearchParams.offset = pageEvent.pageIndex * pageEvent.pageSize;
            }

            this.currSearchParams.max = pageEvent.pageSize;
            this._queryVariants(this.currSearchParams);
        }
    }

    showFilters(){
        if (this.showVarFilters) {
            this.showVarFilters = false;
        } else {
            this.showVarFilters = true;
        }
    }

}
