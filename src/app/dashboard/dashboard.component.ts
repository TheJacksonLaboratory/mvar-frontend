import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from 'environments/environment';
import { SearchService } from "../analysis/search.service";
import { MVARStat } from "../models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchOption = 'variant';
  mvarStat: MVARStat;

  selectedSearchBy: string;

  apiUrl: string;

  //searchparams
  currSearchParams: any = {}

  constructor(private searchService: SearchService, private router: Router) { }
  ngOnInit() {
    this.apiUrl = environment.MVAR_API_SWAGGER_URL;
    this.searchService.getStats();

    // const selectedItems = this.searchService.getSelectedSearchItems();
    // if (selectedItems && selectedItems.selectedValue) {
    //   console.log("box")
    //   console.log(selectedItems)
    //   this.onSelectedItem(selectedItems);
    //   this.searchService.setSelectedSearchItems({})
    // }
    this.searchService.mvarStatSubject.subscribe(data => {
      this.mvarStat = data;
    });
  }

  onSelectedItem(event: any) {
    this.searchService.setSelectedSearchItems(event);
    console.log("dashboard event:" + event);
    // if (this.searchOption === 'variant') {
    this.router.navigate(['/variant'])
    // }
  }
}
