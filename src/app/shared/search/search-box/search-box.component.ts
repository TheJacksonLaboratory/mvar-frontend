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

          this.placeHolderTxt = 'Search for snps and indels by gene, sample, jax registry id, new mutant id, strain, or phenotype';
          this.myControlSubscription = this.myControl.valueChanges.subscribe(value => {
                  this.geneOptions = [];
                  this.strainOptions = [];
                  this.phenotypeOptions = [];
                  this.sampleOptions = [];
                  if (value && value.length > 0) {
                      this._variantFilter(value);
                  }
              }
          );
      }

      if (this.searchType === 'svVariant') {

          this.placeHolderTxt = 'Search for structural variants by gene, sample, jax registry id, new mutant id, strain, or phenotype';
          this.myControlSubscription = this.myControl.valueChanges.subscribe(value => {
                  this.geneOptions = [];
                  this.strainOptions = [];
                  this.phenotypeOptions = [];
                  this.sampleOptions = [];
                  if (value && value.length > 0) {
                      this._svVariantFilter(value);
                  }
              }
          );
      }

      if (this.searchType === 'sample') {

          this.placeHolderTxt = 'Search for samples by id, name, jax registry id, new mutant id, strain, or phenotype';
          this.myControlSubscription = this.myControl.valueChanges.subscribe(value => {
                  this.strainOptions = [];
                  this.phenotypeOptions = [];
                  this.sampleOptions = [];
                  if (value && value.length > 0) {
                      this._sampleFilter(value);
                  }
              }
          );
      }
  }

  private _sampleFilter(value: string) {
      const filterValue = value.toLowerCase();

      this._searchStrains(filterValue);

      this._searchPhenotypes(filterValue);

      this._searchSamples(filterValue);
  }

  private _variantFilter(value: string) {
    const filterValue = value.toLowerCase();

    this._searchGenes(filterValue);

    this._searchStrains(filterValue);

    this._searchPhenotypes(filterValue);

    this._searchSamples(filterValue);
  }

  private _svVariantFilter(value: string) {
     const filterValue = value.toLowerCase();

        this._searchGenes(filterValue);

        this._searchStrains(filterValue);

        this._searchPhenotypes(filterValue);

        this._searchSamples(filterValue);
  }

  private _searchSamples(filterValue: string) {
    this.searchService.searchSample(filterValue).subscribe(data => {

      console.log('Sample count = ' + data.sampleCount);

      this.sampleCount = data.sampleCount;
      this.sampleOptions = data.samples;

      console.log(this.sampleOptions);

    });
  }

  private _searchPhenotypes(filterValue: string) {
    this.searchService.searchPhenotype(filterValue).subscribe(data => {

      console.log('phenotype count = ' + data.phenotypeCount);

      this.phenotypeCount = data.phenotypeCount;
      this.phenotypeOptions = data.phenotypes;
      //console.log(this.phenotypeOptions);

    });
  }

  private _searchStrains(filterValue: string) {
    this.searchService.searchStrain(filterValue).subscribe(data => {

      console.log('strain count = ' + data.strainCount);

      this.strainCount = data.strainCount;
      this.strainOptions = data.strains;
      //console.log(this.strainOptions);

    });
  }

  private _searchGenes(filterValue: string) {
    this.searchService.searchGene(filterValue).subscribe(data => {
      console.log('gene count = ' + data.geneCount);

      this.geneCount = data.geneCount;
      this.geneOptions = data.genes;
      //console.log(this.geneOptions);

    });
  }

  public selectedChanged(type: string, value: any, displayValue: string) {
    this.selectedSearchItem.emit({selectedType: type, selectedValue: value, displayedValue: displayValue});
    this.myControl.setValue('');
    console.log(this.selectedSearchItem);
  }

}
