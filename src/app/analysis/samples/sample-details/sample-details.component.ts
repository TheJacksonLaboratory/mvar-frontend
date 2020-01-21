import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Sample, Phenotype, SampleStatistics} from "../../../models";
import {MatTable} from "@angular/material";
import {SearchService} from "../../search.service";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StrainDialogComponent} from '../../dialogs/strain-dialog/strain-dialog.component';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-sample-details',
  templateUrl: './sample-details.component.html',
  styleUrls: ['./sample-details.component.scss']
})
export class SampleDetailsComponent implements OnInit{

  @Input()
  sample: Sample;
  displayedColumns = ['mpTermIdentifier','mpTermName', 'samples']
  phenotypeDataSource: Phenotype[] = [];
  sampleStats: SampleStatistics;

  dialogRef: any;

  jaxRegistryUrl = environment.JAX_STRAIN_REGISTRY_URL;
  jaxPhenotypeURL = environment.JAX_MAMMALIAN_PHENOTYPE_URL;

  constructor(public dialog: MatDialog, private searchService: SearchService) {
  }

  ngOnInit() {
      this.phenotypeDataSource = this.sample.phenotypes;
  }

  loadStats(){
      this.getSampleVariantStats();
      this.getSampleSvVariantStats();
  }

  getSampleVariantStats(){
      console.log('getting var stat data')
      const params: any = {};
      params.selectedItems = [{selectedType: 'sample', selectedValue: this.sample}];
      params.max = 1;

      //total count
      this.searchService.queryVariant(params).subscribe( data => {

          this.sample.totalVarCount = data.variantCount;
          console.log(this.sample.totalVarCount);
      });

      //rare variants
      params.rareVar = true;
      this.searchService.queryVariant(params).subscribe( data => {

          this.sample.rareVarCount = data.variantCount;
          console.log(this.sample.rareVarCount);
      });

      //likely pathogenic
      params.rareVar = null;
      params.candidateVar = true;
      this.searchService.queryVariant(params).subscribe( data => {

          this.sample.candidateVarCount = data.variantCount;
          console.log(this.sample.candidateVarCount);
      });

      //confirmed mutations
      params.candidateVar = null;
      params.confirmedVar = true;
      this.searchService.queryVariant(params).subscribe( data => {

          this.sample.confirmedVarCount = data.variantCount;
          console.log(this.sample.confirmedVarCount);
      });

      this.searchService.getSampleStatistics(this.sample.id).subscribe(data => {
          this.sample.sampleStats = data;
          console.log(this.sample.sampleStats)
      });
  }

  getSampleSvVariantStats() {
      console.log('getting sv var stat data')
      const params: any = {};
      params.selectedItems = [{selectedType: 'sample', selectedValue: this.sample}];
      params.max = 1;

      //total count
      this.searchService.querySvVariant(params).subscribe( data => {

          this.sample.totalSvVarCount = data.svVariantCount;
          console.log(this.sample.totalSvVarCount);
      });

      //rare variants
      params.rareVar = true;
      this.searchService.querySvVariant(params).subscribe( data => {

          this.sample.rareSvVarCount = data.svVariantCount;
          console.log(this.sample.rareSvVarCount);
      });

      //likely pathogenic
      params.rareVar = null;
      params.candidateVar = true;
      this.searchService.querySvVariant(params).subscribe( data => {

          this.sample.candidateSvVarCount = data.svVariantCount;
          console.log(this.sample.candidateSvVarCount);
      });

      //confirmed mutations
      params.candidateVar = null;
      params.confirmedVar = true;
      this.searchService.querySvVariant(params).subscribe( data => {

          this.sample.confirmedSvVarCount = data.svVariantCount;
          console.log(this.sample.confirmedSvVarCount);
      });

  }


    openStrainDialog() {
        console.log("open strain dialog");
        this.dialogRef = this.dialog.open(StrainDialogComponent, {
            width: '50%', height: '50%',
            data: {
                strain: this.sample.strain
            }
        });
    }
}
