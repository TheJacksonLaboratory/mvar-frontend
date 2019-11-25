import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {Gene, Variant} from '../../models';
import {SearchService} from '../search.service';
import {PageEvent} from '@angular/material/paginator';
import {MatPaginator, MatTable} from "@angular/material";
import { ActivatedRoute } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-snps-indels',
  templateUrl: './snps-indels.component.html',
  styleUrls: ['./snps-indels.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class SnpsIndelsComponent implements AfterViewInit, OnInit {

  @ViewChild('varPaginator', {static: true}) varPaginator: MatPaginator;
  @ViewChild( MatSort ) sort: MatSort;

  //Table items
  displayedColumns = ['symbol', 'chr', 'pos', 'ref', 'alt', 'type','snpEffImpact', 'snpEffFunctionalClass', 'varFreq', 'mutantCandidate', 'sampleId']; //'filter' 'dbSNPId'
  varDataSource: Variant[] = [];
  varCount: number;

  // MatPaginator Inputs
  pageLength = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];

  //searchparams
  currSearchParams: any = {}

  showVarFilters = false;

  expandedElement: Variant | null;

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

          const rareVars = paramsIn.get('rareVar');
          if (rareVars) {
              this.currSearchParams.rareVar = true;
          }

          const confirmedVar = paramsIn.get('confirmedVar');
          if (confirmedVar) {
              this.currSearchParams.confirmedVar = true;
          }

          this._queryVariants(this.currSearchParams);
      });

      //this.varDataSource.sort(this.sort)

      this._queryVariants(this.currSearchParams);
  }

  ngAfterViewInit() {

      this.sort.sortChange.subscribe(() => {
          console.log("Sorting")
          console.log(this.sort.active)
          console.log(this.sort.direction)

          this.currSearchParams.sortBy = this.sort.active;
          this.currSearchParams.sortDirection = this.sort.direction;
          this.currSearchParams.offset = 0;
          this.varPaginator.pageIndex = 0;
          this._queryVariants(this.currSearchParams)
      });
  }


  public onSearchCriteriaChange(searchCriteria: any){

    const params: any = {};

    if (searchCriteria.selectedItems.length > 0) {
        this.currSearchParams.selectedItems = searchCriteria.selectedItems;
    }

    this.currSearchParams.offset = 0;
    this.varPaginator.pageIndex = 0;
    this._queryVariants(this.currSearchParams);

  }

  private _queryVariants(params: any) {

    this.searchService.queryVariant(params).subscribe(data => {

      let temp = data.variants as Variant[];

      temp.forEach(variant => {
        if (!variant.gene) {variant.gene = new Gene()};
      });
      this.varDataSource = temp;

      this.varCount = data.variantCount;
      this.pageLength = this.varCount;

      console.log('var count = ' + this.varCount)
      console.log(this.varDataSource);

    });
  }

  doPageChange(pageEvent: any) {

    console.log(pageEvent.pageSize + pageEvent.pageIndex);
    if (this.currSearchParams) {
      this.currSearchParams.offset = pageEvent.pageIndex * pageEvent.pageSize;
      this.currSearchParams.max = pageEvent.pageSize;
      this._queryVariants(this.currSearchParams);
    }
  }

  showFilters() {
    if (this.showVarFilters) {
        this.showVarFilters = false;
    } else {
        this.showVarFilters = true;
    }
  }

    expandCollapse(element:any){
        console.log(element)
        this.expandedElement = this.expandedElement === element ? null : element

    }

    exportCSV(){
        console.log("current var count = " + this.varCount)

        const exportSearchCriteria = this.currSearchParams;
        if (this.varCount && this.varCount > 0){
            exportSearchCriteria.offset = 0;
            exportSearchCriteria.max = this.varCount;

            if (confirm(this.varCount + " records will be exported to a CSV file, do you want to continue?")){
                this.searchService.exportVariantsToCSV(exportSearchCriteria);
            }
        }
    }
}


