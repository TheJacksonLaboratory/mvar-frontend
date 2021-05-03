import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchService} from '../../../analysis/search.service';
import {chromosomes} from '../../../models';


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

    @Input()
    resetSearch: boolean;

    @Output()
    showFiltersChange = new EventEmitter<boolean>();

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

    annotationOptions: any[] = [];
    annotationCount: number;

    seqStrains: any[] = [];

    placeHolderTxt = '';
    chr = '';
    startPos = '';
    endPos = '';

    hgvs = '';
    mvarId = '';

    selectable = true;
    removable = true;

    showStrains = false;
    showConsequence =  false;
    showVarRegion = false;
    selectedStrains = new Map();

    constructor(private searchService: SearchService) {
        console.log('contructor searchBox, type = ' + this.searchType);
    }

    ngOnInit() {
        console.log('searchBox, type = ' + this.searchType);

        if (! this.resetSearch) {
            this.searchCriteria = this.searchService.getSelectedSearchItems();
            console.log('###searchItems');
            console.log(this.searchCriteria);
        }

        if (this.searchCriteria.selectedSearchBy) {

            this.selectedSearchBy = this.searchCriteria.selectedSearchBy;
            this.initSearch(this.searchCriteria);
        }

        this.setSearchBox();


        this.searchService.loadSequencedStrains().subscribe(data => {
            this.seqStrains = data.strains;
            this.searchService.seqStrains = data.strains;

            this.seqStrains.forEach(strain => {
                this.selectedStrains.set(strain.strain, strain);
            });
        });
    }


    initSearch(searchItems: any) {
        this.selectedSearchItem.emit(this.searchCriteria);

        if (!this.searchCriteria.selectedItems) {
            this.searchCriteria.selectedItems = []
        }
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
                    if (value && value.length > 0) {
                        this._variantFilter(value);
                    }
                }
            );
        }

        if (this.searchType === 'variant-strain') {

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

    private _searchStrains(filterValue: string) {
        this.searchService.searchStrain(filterValue).subscribe(data => {
            console.log('strain count = ' + data.length);
            this.strainCount = data.length;
            this.strainOptions = data;
        });
    }

    private _searchGenes(filterValue: string) {
        this.searchService.searchGene(filterValue).subscribe(data => {
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
    }

    public searchByPosition() {
        this.searchCriteria.chr = this.chr;
        this.searchCriteria.startPos = this.startPos;
        this.searchCriteria.endPos = this.endPos;
        this._searchItem();
    }

    public searchByHGVS(hgvs: String) {

        this.searchCriteria.selectedItems.push({
            selectedType: 'hgvs',
            selectedValue: hgvs,
            displayedValue: hgvs
        });

        this._searchItem();
    }

    public searchByMVARid(mvarId: string) {

        this.searchCriteria.selectedItems.push({
            selectedType: 'mvarId',
            selectedValue: mvarId,
            displayedValue: mvarId
        });

        this._searchItem();
    }

    private _searchItem() {

        this.searchCriteria.selectedSearchBy = this.selectedSearchBy;
        //this.showFilterOptions();
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
        this.hgvs = '';
        this.mvarId = '';
        this.searchCriteria.hgvs = [];
        this.searchCriteria.mvarId = [];
        this.searchCriteria.varType = [];
        this.searchCriteria.consequence = [];
        this.searchCriteria.varImpact = [];
        this.searchCriteria.selectedItems = [];

        if (! this.resetSearch) {
            this.selectedSearchItem.emit(this.searchCriteria);
        }
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

        this.showFiltersChange.emit(this.showFilters)
    }

    showStrainsList() {
        if (this.showStrains) {
            this.showStrains = false;
        } else {
            this.showStrains = true;
        }
    }

    showConsequenceList() {
        if (this.showConsequence) {
            this.showConsequence = false;
        } else {
            this.showConsequence = true;
        }
    }

    showVarRegionList() {
        if (this.showVarRegion) {
            this.showVarRegion = false;
        } else {
            this.showVarRegion = true;
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

        //set variation consequence
        if (criteriaType === 'consequence') {
            if (!this.searchCriteria.consequence) {
                this.searchCriteria.consequence = []
            }

            const indx = this.searchCriteria.consequence.indexOf(value);
            if (indx === -1) {
                this.searchCriteria.consequence.push(value)
            } else {
                this.searchCriteria.consequence.splice(indx, 1)
            }
        }
    }

    isStrainChecked(name: string) {
        if (this.selectedStrains.get(name)) {
            return true;
        } else {
            return false;
        }
    }

    isVarTypeChecked(name: string) {
        if (this.searchCriteria.varType && this.searchCriteria.varType.indexOf(name) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    isImpactChecked(name: string) {
        if (this.searchCriteria.varImpact && this.searchCriteria.varImpact.indexOf(name) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    isConsequenceChecked(name: string) {
        if (this.searchCriteria.consequence && this.searchCriteria.consequence.indexOf(name) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    onStrainChange(strain: any) {

        if (this.selectedStrains.get(strain.strain)) {
            this.selectedStrains.delete(strain.strain);
        } else {
            this.selectedStrains.set(strain.strain, strain)
        }
    }

    updateSearch() {

        this.searchCriteria.strains = Array.from(this.selectedStrains.values());
        //emit change
        this.selectedSearchItem.emit(this.searchCriteria);

        this.showFilterOptions();

        if (this.selectedStrains.size < 1) {
            this.setSelectedStrains();
        }
    }

    setSelectedStrains() {
        this.seqStrains.forEach(strain => {
            this.selectedStrains.set(strain.strain, strain);
        });
    }

    clearAllStrains() {
        this.selectedStrains.clear();
    }

    selectAllStrains() {
        this.selectedStrains.clear();
        this.setSelectedStrains();
    }
}

