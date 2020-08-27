import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "../analysis/search.service";
import {MVARStats} from "../models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchOption = 'variant';
  mvarStats: MVARStats;

  constructor(private searchService: SearchService, private router: Router) { }
  ngOnInit() {
      this.searchService.getStats();

      this.searchService.mvarStatsSubject.subscribe(data => {
          this.mvarStats = data;
      });
  }

  onSelectedItem(event: any){
      this.searchService.setSelectedSearchItems(event);
      if (this.searchOption === 'variant') {
          this.router.navigate(['/snpsIndels'])
      }
  }
}
