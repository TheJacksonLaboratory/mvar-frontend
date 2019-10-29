import { Component, OnInit, Input } from '@angular/core';
import {Sample, Phenotype} from "../../../models";
import {MatTable} from "@angular/material";

@Component({
  selector: 'app-sample-details',
  templateUrl: './sample-details.component.html',
  styleUrls: ['./sample-details.component.scss']
})
export class SampleDetailsComponent implements OnInit {

  @Input()
  sample: Sample;
  displayedColumns = ['mpTermIdentifier','mpTermName', 'samples']
  phenotypeDataSource: Phenotype[] = [];

  constructor() {
  }

  ngOnInit() {
      this.phenotypeDataSource = this.sample.phenotypes;
  }




}
