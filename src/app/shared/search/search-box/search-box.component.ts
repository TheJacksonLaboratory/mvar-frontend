import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {SearchService} from '../../../analysis/search.service';
import {Gene} from '../../../models';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnChanges {

  @Input()
    searchType: string;

  @Output()
    selectedSearchItem = new EventEmitter<any>();

  myControl = new FormControl();
  myControlSubscription: any;

  geneOptions: any[] = [];
  geneCount: number;

  strainOptions: any[] = [];
  strainCount: number;

  transcriptOptions: any[] = [];
  transcriptCount: number;
  
  alleleOptions: any[] = [];
  alleleCount: number;

  phenotypeOptions: any[] = [];
  phenotypeCount: number;

  sampleOptions: any[] = [];
  sampleCount: number;

  placeHolderTxt = '';



  constructor(private searchService: SearchService) {
    console.log('contructor searchBox, type = ' + this.searchType);
  }

  ngOnInit() {
    console.log('searchBox, type = ' + this.searchType);
    this.setSearchBox()
  }

  ngOnChanges(changes: SimpleChanges){
      console.log(changes.searchType.currentValue)
      this.setSearchBox()
  }

  setSearchBox(){
      if (this.myControlSubscription ) {
          this.myControlSubscription.unsubscribe();
      }

      if (this.searchType === 'variant') {

          this.placeHolderTxt = 'Search for snps and indels by gene and/or strain';
          this.myControlSubscription = this.myControl.valueChanges.subscribe(value => {
                  this.geneOptions = [];
                  this.strainOptions = [];
                  // this.phenotypeOptions = [];
                  // this.sampleOptions = [];
                  if (value && value.length > 0) {
                      this._variantFilter(value);
                  }
              }
          );
      }

    }

  // private _sampleFilter(value: string) {
  //     const filterValue = value.toLowerCase();

  //     this._searchStrains(filterValue);

  //     // this._searchPhenotypes(filterValue);

  // }

  private _variantFilter(value: string) {
    const filterValue = value.toLowerCase();

    this._searchGenes(filterValue);

    this._searchStrains(filterValue);

   // this._searchTranscripts(filterValue);

    // this._searchAlleles(filterValue);

    // this._searchPhenotypes(filterValue);
  }
  // private _searchPhenotypes(filterValue: string) {
  //   this.searchService.searchPhenotype(filterValue).subscribe(data => {

  //     console.log('phenotype count = ' + data.phenotypeCount);

  //     this.phenotypeCount = data.phenotypeCount;
  //     this.phenotypeOptions = data.phenotypes;
  //     //console.log(this.phenotypeOptions);

  //   });
  // }

  private _searchStrains(filterValue: string) {
    this.searchService.searchStrain(filterValue).subscribe(data => {
      console.log('strain count = ' + data.length);
      this.strainCount = data.length;
      this.strainOptions = data;
    });
  }

  private _searchGenes(filterValue: string) {
    this.searchService.searchGene(filterValue).subscribe(data => {
      console.log('gene count = ' + data.length);
      console.log('gene  = ' + data); 
      this.geneCount = data.length;
      this.geneOptions = data;
    });
  }

  private _searchTranscripts(filterValue: string) {
    this.searchService.searchTranscript(filterValue).subscribe(data => {
      console.log('transcript count = ' + data.length);
      this.transcriptCount = data.length;
      this.transcriptOptions = data;
    });
  }

  private _searchAlleles(filterValue: string) {
    this.searchService.searchAllele(filterValue).subscribe(data => {
      console.log('allele count = ' + data.length);
      this.alleleCount = data.alleleCount;
      this.alleleOptions = data.alleleList;
    });
  }

  public selectedChanged(type: string, value: any, displayValue: string) {
    this.selectedSearchItem.emit({selectedType: type, selectedValue: value, displayedValue: displayValue});
    this.myControl.setValue('');
    console.log(this.selectedSearchItem);
  }

}
