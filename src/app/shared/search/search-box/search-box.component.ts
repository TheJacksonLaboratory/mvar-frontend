import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {SearchService} from '../../../analysis/search.service';
import {Gene, chromosomes} from '../../../models';


@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

    @Input()
    searchType: string;

    @Input()
    selectedSearchBy: string;

    @Output()
    selectedSearchItem = new EventEmitter<any>();

    @Input()
    showHint;

    @Input()
    showFilters: boolean;

    chromosomes = chromosomes;

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

    seqStrains: any[] = [];

    placeHolderTxt = '';
    chr = '';
    startPos = '';
    endPos = '';

    hgvs = '';

    selectable = true;
    removable = true;

    showStrains = false;
    selectedStrains: string[] = [];

    varTypeSNP = false;
    varTypeINS = false;
    varTypeDEL = false;

    varImpactHIGH = false;
    varImpactMODERATE = false;
    varImpactLOW = false;
    varImpactMODIFIER = false;

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


        this.searchService.loadSequencedStrains().subscribe(data => {
            this.seqStrains = data.strains;
            this.searchService.seqStrains = data.strains;
        });
    }


    initSearch(searchItems: any) {
        this.selectedSearchItem.emit({
            selectedSearchBy: searchItems.selectedSearchBy,
            selectedItems: searchItems.selectedItems,
            chr: searchItems.chr,
            startPos: searchItems.startPos,
            endPos: searchItems.endPos,
            hgvs: searchItems.hgvs
        });
        console.log(this.selectedSearchItem);
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
        //console.log(this.selectedSearchItem);
    }

    public searchByPosition() {

        this.searchCriteria.chr = this.chr;
        this.searchCriteria.startPos = this.startPos;
        this.searchCriteria.endPos = this.endPos;
        this.searchCriteria.selectedItems = []
        this.searchCriteria.selectedSearchBy = this.selectedSearchBy;
        this.showFilterOptions();

        this.selectedSearchItem.emit(this.searchCriteria);
    }

    public searchByHGVS() {

        this.searchCriteria.hgvs = this.hgvs;
        this.searchCriteria.selectedItems = []
        this.searchCriteria.selectedSearchBy = this.selectedSearchBy;
        this.showFilterOptions();

        this.selectedSearchItem.emit(this.searchCriteria);
    }

    setChromosome(value: string, event: any) {

        if (event.isUserInput === true) {
            this.startPos = ''
            this.endPos = ''
        }
    }

    reset() {
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

    showFilterOptions() {
        if (this.showFilters) {
            this.showFilters = false;
        } else {
            this.showFilters = true;
        }
    }

    showStrainsList() {
        if (this.showStrains) {
            this.showStrains = false;
        } else {
            this.showStrains = true;
        }
    }


    onSearchCriteriaChange(criteriaType: string, value: any) {

        if (!this.searchCriteria.selectedItems) {
            this.searchCriteria.selectedItems = []
        }

        //set variation type to search criteria
        if (criteriaType === 'varType') {
            if (!this.searchCriteria.varType) {
                this.searchCriteria.varType = []
            }

            const indx = this.searchCriteria.varType.indexOf(value);
            if (indx === -1) {
                this.searchCriteria.varType.push(value)
            } else {
                this.searchCriteria.varType.splice(indx, 1)
            }
        }

        //set impact to search criteria
        if (criteriaType === 'varImpact') {
            if (!this.searchCriteria.varImpact) {
                this.searchCriteria.varImpact = []
            }

            const indx = this.searchCriteria.varImpact.indexOf(value);
            if (indx === -1) {
                this.searchCriteria.varImpact.push(value);
            } else {
                this.searchCriteria.varImpact.splice(indx, 1);
            }
        }
    }

    isStrainChecked(name: string) {
        const indx = this.selectedStrains.indexOf(name);
        if (indx === -1) {
            return false;
        } else {
            return true;
        }
    }

    onStrainChange(name: string) {
        const indx = this.selectedStrains.indexOf(name);
        if (indx === -1) {
            this.selectedStrains.push(name)
        } else {
            this.selectedStrains.splice(indx, 1);
        }
    }

    updateSearch() {

        this.searchCriteria.strains = this.selectedStrains;
        //emit change
        this.selectedSearchItem.emit(this.searchCriteria);

        this.showFilterOptions();
    }
}
