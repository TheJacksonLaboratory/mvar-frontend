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

    @Input()
    selectedSearchBy: string;

    @Output()
    selectedSearchItem = new EventEmitter<any>();

    @Input()
    showHint;

    searchCriteria: any = {selectedItems: []};

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

    annotationOptions: any[] = [];
    annotationCount: number;


    placeHolderTxt = '';
    chr = '';
    startPos = '';
    endPos = '';

    selectable = true;
    removable = true;


    chromosomes = [
        {value: '1', viewValue: '1'},
        {value: '2', viewValue: '2'},
        {value: '3', viewValue: '3'},
        {value: '4', viewValue: '4'},
        {value: '5', viewValue: '5'},
        {value: '6', viewValue: '6'},
        {value: '7', viewValue: '7'},
        {value: '8', viewValue: '8'},
        {value: '9', viewValue: '9'},
        {value: '10', viewValue: '10'},
        {value: '11', viewValue: '11'},
        {value: '12', viewValue: '12'},
        {value: '13', viewValue: '13'},
        {value: '14', viewValue: '14'},
        {value: '15', viewValue: '15'},
        {value: '16', viewValue: '17'},
        {value: '18', viewValue: '18'},
        {value: '19', viewValue: '19'},
        {value: 'X', viewValue: 'X'},
        {value: 'Y', viewValue: 'Y'},
        {value: 'MT', viewValue: 'MT'}];

    constructor(private searchService: SearchService) {
        console.log('contructor searchBox, type = ' + this.searchType);
    }

    ngOnInit() {
        console.log('searchBox, type = ' + this.searchType);


        const searchItems = this.searchService.getSelectedSearchItems();
        console.log('###searchItems');
        console.log(searchItems);

        if (searchItems.selectedSearchBy) {

            this.selectedSearchBy = searchItems.selectedSearchBy;

            this.initSearch(searchItems);
            this.searchCriteria = searchItems;
            this.searchService.setSelectedSearchItems({})
        }

        this.setSearchBox();
    }


    initSearch(searchItems: any) {
        this.selectedSearchItem.emit({
            selectedSearchBy: searchItems.selectedSearchBy,
            selectedItems: searchItems.selectedItems,
            chr: searchItems.chr,
            startPos: searchItems.startPos,
            endPos: searchItems.endPos
        });
        console.log(this.selectedSearchItem);
    }


    ngOnChanges(changes: SimpleChanges) {
        console.log(changes.searchType.currentValue)
        this.setSearchBox()
    }


    setSearchBox() {
        if (this.myControlSubscription) {
            this.myControlSubscription.unsubscribe();
        }

        if (this.searchType === 'variant') {

            this.placeHolderTxt = 'Enter gene symbol';
            this.myControlSubscription = this.myControl.valueChanges.subscribe(value => {
                    this.geneOptions = [];
                    this.strainOptions = [];
                    this.annotationOptions = [];
                    // this.phenotypeOptions = [];
                    // this.sampleOptions = [];
                    if (value && value.length > 0) {
                        this._variantFilter(value);
                    }
                }
            );
        }

        if (this.searchType === 'strain-variant') {

            this.placeHolderTxt = 'Enter gene symbol';
            this.myControlSubscription = this.myControl.valueChanges.subscribe(value => {
                    this.geneOptions = [];
                    if (value && value.length > 0) {
                        this._strainVariantFilter(value);
                    }
                }
            );
        }

    }

    private _variantFilter(value: string) {
        const filterValue = value.toLowerCase();

        this._searchGenes(filterValue);

        // this._searchStrains(filterValue);
        //
        // this._searchAnnotation(filterValue);

        // this._searchTranscripts(filterValue);

        // this._searchAlleles(filterValue);

        // this._searchPhenotypes(filterValue);
    }


    private _strainVariantFilter(value: string) {
        const filterValue = value.toLowerCase();

        this._searchGenes(filterValue);
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

    private _searchAnnotation(filterValue: string) {
        this.searchService.searchAnnotation(filterValue).subscribe(data => {
            console.log('sequence ontology count = ' + data.length);
            console.log('fsequence ontology = ' + data);
            this.annotationCount = data.length;
            this.annotationOptions = data;
        })
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

        this.searchCriteria.selectedItems.push({
            selectedType: type,
            selectedValue: value,
            displayedValue: displayValue
        });
        this.searchCriteria.selectedSearchBy = this.selectedSearchBy;
        this.selectedSearchItem.emit(this.searchCriteria);
        //this.myControl.setValue('');
        console.log(this.selectedSearchItem);
    }

    public searchByPosition() {
        console.log('Search by position');

        this.searchCriteria.chr = this.chr;
        this.searchCriteria.startPos = this.startPos;
        this.searchCriteria.endPos = this.endPos;
        this.searchCriteria.selectedItems = []
        this.searchCriteria.selectedSearchBy = this.selectedSearchBy;

        this.selectedSearchItem.emit(this.searchCriteria);
    }

    setChromosome(value: string, event: any) {

        if (event.isUserInput === true) {
            this.startPos = ''
            this.endPos = ''
        }


        // if (event.isUserInput === true) {
        //     console.log(value)
        //     this.selectedChr = value;
        //     if (value === 'All') {
        //         this.searchCriteria.chr = ''
        //         this.startPos = ''
        //         this.endPos = ''
        //     } else {
        //         this.searchCriteria.chr = value
        //     }
        // }
    }

    reset() {
        console.log('RESET')
        this.chr = '';
        this.startPos = '';
        this.endPos = '';
    }

    remove(selected: any) {

        const indx = this.searchCriteria.selectedItems.indexOf(selected)
        if (indx > -1) {
            this.searchCriteria.selectedItems.splice(indx, 1)
        }
        this.selectedSearchItem.emit(this.searchCriteria);
    }

    removeRegion() {

        this.searchCriteria.chr = '';
        this.searchCriteria.startPos = '';
        this.searchCriteria.endPos = '';

        this.selectedSearchItem.emit(this.searchCriteria);

    }
}
