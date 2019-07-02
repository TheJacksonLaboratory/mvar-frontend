import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Gene, Variant} from '../../models';
import {SearchService} from '../search.service';
import {PageEvent} from '@angular/material/paginator';
import {MatPaginator, MatTable} from "@angular/material";

@Component({
  selector: 'app-snps-indels',
  templateUrl: './snps-indels.component.html',
  styleUrls: ['./snps-indels.component.css']
})
export class SnpsIndelsComponent implements OnInit {

  @ViewChild('varPaginator') varPaginator: MatPaginator;

  //Table items
  displayedColumns = ['symbol', 'chr', 'pos', 'ref', 'alt', 'type', 'filter', 'functionalClass', 'dbSNPId', 'sampleCount', 'candidate', 'sampleId'];
  varDataSource: Variant[] = [];
  varCount: number;

  // MatPaginator Inputs
  pageLength = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100, 500];

  //searchparams
  currSearchParams: any;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
  }


  public onSearchCriteriaChange(searchCriteria: any){

    const params: any = {};

    if (searchCriteria.searchCriteriaList.length > 0) {
      params.selectedItems = searchCriteria.searchCriteriaList;
      this._queryVariants(params);
    }else{
      this.varDataSource = [];
    }

  }

  private _queryVariants(params: any) {
    this.currSearchParams = params
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

}


