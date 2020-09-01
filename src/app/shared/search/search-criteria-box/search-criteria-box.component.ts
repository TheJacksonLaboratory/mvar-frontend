import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from "../../../analysis/search.service";

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
  searchCriteriaChange = new EventEmitter<any>();



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

  constructor(private searchService: SearchService) { }

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

    //set low quality flag
    this.searchCriteria.lowQual = this.varLowQual;

    //set external id
    this.searchCriteria.withoutExternalId = this.withoutExternalId;

    //emit change
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

  onSampleStudyChange(study: string) {
    console.log('Study Change: ' + study);
    this.searchCriteria.study = study;

    //emit change
    this.searchCriteriaChange.emit(this.searchCriteria);
  }
}
