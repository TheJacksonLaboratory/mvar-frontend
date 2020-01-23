import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  selectedTab: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

      this.route.paramMap.subscribe(paramsIn => {

          const selectedTabIn = paramsIn.get('selectedTab') as number;
          if (selectedTabIn) {
              this.selectedTab = selectedTabIn;
          }
      });
  }

}
