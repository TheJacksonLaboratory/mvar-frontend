import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-search-criteria-box',
  templateUrl: './search-criteria-box.component.html',
  styleUrls: ['./search-criteria-box.component.css']
})
export class SearchCriteriaBoxComponent implements OnInit {


  @Input()
    searchType: string;

  @Output()
    selectedSearchCriteria = new EventEmitter<any>();

  searchCriteriaItems: any[] = [];

  selectable = true;
  removable = true;

  @Input()
  selectedSearchTerms: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  remove(selected: any){

    const indx = this.searchCriteriaItems.indexOf(selected)
    if (indx > -1){
      this.searchCriteriaItems.splice(indx, 1)
    }
    this.selectedSearchCriteria.emit({searchCriteriaList: this.searchCriteriaItems});
  }

  public onSelectedItem(selected: any) {
    console.log('on selected')
    console.log(selected);

    this.searchCriteriaItems.push(selected);

    this.selectedSearchCriteria.emit({searchCriteriaList: this.searchCriteriaItems});
  }

}
