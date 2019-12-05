import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "../analysis/search.service";
import {MMRDBStats} from "../models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchOption = 'variant';
  mmrdbStats: MMRDBStats;

  constructor(private searchService: SearchService, private router: Router) { }
  ngOnInit() {
      this.searchService.getStats();

      this.searchService.mmrdbStatsSubject.subscribe(data => {
          this.mmrdbStats = data;
      });
  }

  onSelectedItem(event: any){
      this.searchService.setSelectedSearchItems(event);
      if (this.searchOption === 'variant') {
          this.router.navigate(['/snpsIndels'])
      } else if (this.searchOption === 'svVariant') {
          this.router.navigate(['/structuralVar'])
      } else if (this.searchOption === 'sample') {
          this.router.navigate(['/samples'])
      }
  }
}
