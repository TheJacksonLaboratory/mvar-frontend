import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchService} from "../../../analysis/search.service";

@Component({
    selector: 'app-search-criteria-box',
    templateUrl: './search-criteria-box.component.html',
    styleUrls: ['./search-criteria-box.component.css']
})
export class SearchCriteriaBoxComponent implements OnInit, AfterViewInit {

    @Input()
    searchType: string;
    @Input()
    showVarFilters: boolean;
    @Input()
    searchCriteria: any;

    @Output()
    showVarFiltersChange = new EventEmitter();

    @Output()
    searchCriteriaChange = new EventEmitter<any>();

    chromosomes = [{value:'All', viewValue:'All'},
        {value:'1', viewValue:'1'},
        {value:'2', viewValue:'2'},
        {value:'3', viewValue:'3'},
        {value:'4', viewValue:'4'},
        {value:'5', viewValue:'5'},
        {value:'6', viewValue:'6'},
        {value:'7', viewValue:'7'},
        {value:'8', viewValue:'8'},
        {value:'9', viewValue:'9'},
        {value:'10', viewValue:'10'},
        {value:'11', viewValue:'11'},
        {value:'12', viewValue:'12'},
        {value:'13', viewValue:'13'},
        {value:'14', viewValue:'14'},
        {value:'15', viewValue:'15'},
        {value:'16', viewValue:'17'},
        {value:'18', viewValue:'18'},
        {value:'19', viewValue:'19'},
        {value:'X', viewValue:'X'},
        {value:'Y', viewValue:'Y'},
        {value:'MT', viewValue:'MT'}];

    selectedChr = 'All'

    selectable = true;
    removable = true;

    filtersTxt = '';

    //search criteria filters
    rareVariantsCheck = false;
    mutantCandidatesCheck = false;
    confirmedMutationsCheck = false;
    varLowQual = false;
    withoutExternalId = false;
    svInExon = false;

    varTypeSNP = false;
    varTypeINS = false;
    varTypeDEL = false;
    varTypeUN = false;

    svVarTypeINV = false;
    svVarTypeINS = false;
    svVarTypeDEL = false;
    svVarTypeDUP = false;
    svVarTypeTRA = false;

    varFuncClassMISSENSE = false;
    varFuncClassNONSENSE = false;
    varFuncClassSILENT = false;
    varFuncClassNONE = false;

    varImpactHIGH = false;
    varImpactMODERATE = false;
    varImpactLOW = false;
    varImpactMODIFIER = false;

    studyOptions = [];
    selectedStudy = 'All'

    startPos = '';
    endPos = '';

    sourceWGS = false;
    sourceWES = false;

    constructor(private searchService: SearchService) {
    }

    ngOnInit() {

        this.filtersTxt = 'Show additional filters';

        if (this.searchCriteria) {
            if (this.searchCriteria.candidateVar) {
                this.mutantCandidatesCheck = true
            }

            if (this.searchCriteria.rareVar) {
                this.rareVariantsCheck = true
            }

            if (this.searchCriteria.confirmedVar) {
                this.confirmedMutationsCheck = true
            }
        }

        const selectedItems = this.searchService.getSelectedSearchItems();
        if (selectedItems && selectedItems.selectedValue) {
            console.log("box")
            console.log(selectedItems)
            this.onSelectedItem(selectedItems);
            this.searchService.setSelectedSearchItems({})
        }

        if (this.searchType == 'sample') {
            this.searchService.getSampleStudies().subscribe(data => {

                this.studyOptions = data.studies;
                this.studyOptions.push('All')
                this.studyOptions.sort()

            });
        }
    }

    ngAfterViewInit() {
    }

    remove(selected: any) {

        const indx = this.searchCriteria.selectedItems.indexOf(selected)
        if (indx > -1) {
            this.searchCriteria.selectedItems.splice(indx, 1)
        }
        this.searchCriteriaChange.emit(this.searchCriteria);
    }

    public onSelectedItem(selected: any) {
        console.log('on selected')
        console.log(selected);

        if (!this.searchCriteria.selectedItems) {
            this.searchCriteria.selectedItems = []
        }
        this.searchCriteria.selectedItems.push(selected);
        this.searchCriteriaChange.emit(this.searchCriteria);
    }

    onSearchCriteriaChange(criteriaType: string, selected: boolean, value: any) {

        console.log('changed criteria');
        console.log(criteriaType + ' , ' + selected + ' , ' + value);
        if (!this.searchCriteria.selectedItems) {
            this.searchCriteria.selectedItems = []
        }

        this.searchCriteria.rareVar = this.rareVariantsCheck;
        this.searchCriteria.candidateVar = this.mutantCandidatesCheck;
        this.searchCriteria.confirmedVar = this.confirmedMutationsCheck;

        //set variation type to search criteria
        if (criteriaType === 'varType') {
            if (!this.searchCriteria.varType) {
                this.searchCriteria.varType = []
            }

            const indx = this.searchCriteria.varType.indexOf(value);
            if (selected && indx === -1) {
                this.searchCriteria.varType.push(value)
            } else if (!selected && indx > -1) {
                this.searchCriteria.varType.splice(indx, 1)
            }
        }

        //set impact to search criteria
        if (criteriaType === 'varImpact') {
            if (!this.searchCriteria.varImpact) {
                this.searchCriteria.varImpact = []
            }

            const indx = this.searchCriteria.varImpact.indexOf(value);
            if (selected && indx === -1) {
                this.searchCriteria.varImpact.push(value);
            } else if (!selected && indx > -1) {
                this.searchCriteria.varImpact.splice(indx, 1);
            }
        }

        //set functional class to search criteria
        if (criteriaType === 'varFuncClass') {
            if (!this.searchCriteria.varFuncClass) {
                this.searchCriteria.varFuncClass = []
            }

            const indx = this.searchCriteria.varFuncClass.indexOf(value);
            if (selected && indx === -1) {
                this.searchCriteria.varFuncClass.push(value);
            } else if (!selected && indx > -1) {
                this.searchCriteria.varFuncClass.splice(indx, 1);
            }
        }

        // set var sequence source
        if (criteriaType === 'varSeqSource') {
            if (!this.searchCriteria.varSeqSource) {
                this.searchCriteria.varSeqSource = []
            }

            const indx = this.searchCriteria.varSeqSource.indexOf(value);
            if (selected && indx === -1) {
                this.searchCriteria.varSeqSource.push(value);
            } else if (!selected && indx > -1) {
                this.searchCriteria.varSeqSource.splice(indx, 1);
            }
        }

        //set low quality flag
        this.searchCriteria.lowQual = this.varLowQual;

        //set external id
        this.searchCriteria.withoutExternalId = this.withoutExternalId;

        //Sv inExon
        this.searchCriteria.inExon = this.svInExon;

        //emit change
        //this.searchCriteriaChange.emit(this.searchCriteria);
    }

    varFilterChange() {
        if (this.showVarFilters) {
            this.showVarFilters = false;
            this.filtersTxt = 'Show additional filters';
        } else {
            this.showVarFilters = true;
            this.filtersTxt = 'Hide additional filters';
        }
    }

    setChromosome(value: string, event: any) {

        if (event.isUserInput === true) {
            console.log(value)
            this.selectedChr = value;
            if (value === 'All') {
                this.searchCriteria.chr = ''
                this.startPos = ''
                this.endPos = ''
            } else {
                this.searchCriteria.chr = value
            }
        }
    }

    onSampleStudyChange(study: string) {
        console.log('Study Change: ' + study);
        this.searchCriteria.study = study;

        //emit change
        this.searchCriteriaChange.emit(this.searchCriteria);
    }

    updateSearch() {

        if (this.endPos === ''){
            this.endPos = this.startPos;
        }
        //start and end pos
        this.searchCriteria.startPos = this.startPos;
        this.searchCriteria.endPos = this.endPos;

        //emit change
        this.searchCriteriaChange.emit(this.searchCriteria);
    }

    hideFilters() {
        this.showVarFilters = false;
        this.showVarFiltersChange.emit(this.showVarFilters)
    }
}
