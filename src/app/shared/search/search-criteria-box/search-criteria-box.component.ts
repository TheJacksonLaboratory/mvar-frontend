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
  searchCriteriaChange  = new EventEmitter<any>();

  selectable = true;
  removable = true;

  constructor() { }

  ngOnInit() {
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

}
