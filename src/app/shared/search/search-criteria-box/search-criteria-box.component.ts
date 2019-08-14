import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-search-criteria-box',
  templateUrl: './search-criteria-box.component.html',
  styleUrls: ['./search-criteria-box.component.css']
})
export class SearchCriteriaBoxComponent implements OnInit {

  @Input()
    searchType: string;

  @Output()
  searchCriteriaChange  = new EventEmitter<any>();

  selectable = true;
  removable = true;
  showVarFilters = false;
  filtersTxt = '';

  //search criteria filters
  rareVariantsCheck = false;
  mutantCandidatesCheck = false;
  confirmedMutationsCheck = false;
  varLowQual = false;

  varTypeSNP = false;
  varTypeINS = false;
  varTypeDEL = false;
  varTypeUN = false;

  varFuncClassMISSENSE = false;
  varFuncClassNONSENSE = false;
  varFuncClassSILENT = false;
  varFuncClassNONE = false;

  varImpactHIGH = false;
  varImpactMODERATE = false;
  varImpactLOW = false;
  varImpactMODIFIER = false;

  constructor() { }

  ngOnInit() {

      this.filtersTxt = 'Show additional filters';
  }

  @Input()
  searchCriteria: any;

  remove(selected: any){

    const indx = this.searchCriteria.selectedItems.indexOf(selected)
    if (indx > -1){
        this.searchCriteria.selectedItems.splice(indx, 1)
    }
    this.searchCriteriaChange.emit(this.searchCriteria);
  }

  public onSelectedItem(selected: any) {
    console.log('on selected')
    console.log(selected);

    if (! this.searchCriteria.selectedItems) {
        this.searchCriteria.selectedItems = []
    }
    this.searchCriteria.selectedItems.push(selected);
    this.searchCriteriaChange.emit(this.searchCriteria);
  }

  onSearchCriteriaChange(criteriaType: string, selected: boolean, value:any){

    console.log('changed criteria');
    if (! this.searchCriteria.selectedItems) {
        this.searchCriteria.selectedItems = []
    }

    this.searchCriteria.rareVar = this.rareVariantsCheck;
    this.searchCriteria.candidateVar = this.mutantCandidatesCheck;
    this.searchCriteria.confirmedVar = this.confirmedMutationsCheck;

    //set variation type to search criteria
    if (criteriaType === 'varType') {
        if (!this.searchCriteria.varTypes){
            this.searchCriteria.varTypes = []
        }

        const indx = this.searchCriteria.varTypes.indexOf(value);
        if (selected && indx === -1) {
            this.searchCriteria.varTypes.push(value)
        } else if (! selected && indx > -1) {
            this.searchCriteria.varTypes.split(indx, 1)
        }
    }

    //set impact to search criteria
    if (criteriaType === 'varImpact') {
        if (!this.searchCriteria.varImpact){
            this.searchCriteria.varImpact = []
        }

        const indx = this.searchCriteria.varImpact.indexOf(value);
        if (selected && indx === -1) {
            this.searchCriteria.varImpact.push(value)
        } else if (! selected && indx > -1) {
            this.searchCriteria.varImpact.split(indx, 1)
        }
    }

    //set functional class to search criteria
    if (criteriaType === 'varFuncClass') {
        if (!this.searchCriteria.varFuncClass){
            this.searchCriteria.varFuncClass = []
        }

        const indx = this.searchCriteria.varFuncClass.indexOf(value);
        if (selected && indx === -1) {
            this.searchCriteria.varFuncClass.push(value)
        } else if (! selected && indx > -1) {
            this.searchCriteria.varFuncClass.split(indx, 1)
        }
    }

    //set low quality flag
    this.searchCriteria.lowQual = this.varLowQual;

    this.searchCriteriaChange.emit(this.searchCriteria);
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
}
