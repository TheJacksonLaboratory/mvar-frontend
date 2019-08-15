import {Injectable, ɵregisterNgModuleType} from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {File} from '../models';
import {forEachComment} from "tslint";
import { environment } from '../../environments/environment';
import {promptGlobalAnalytics} from "@angular/cli/models/analytics";

const geneUrl = environment.MMRDB_API_GENE_URL;
const strainUrl = environment.MMRDB_API_STRAIN_URL;
const phenotypeUrl = environment.MMRDB_API_PHENOTYPE_URL;
const sampleUrl = environment.MMRDB_API_SAMPLE_URL;
const variantQueryUrl = environment.MMRDB_API_VARIANT_SEARCH_URL;
const sampleQueryUrl = environment.MMRDB_API_SAMPLE_URL + '/query';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public searchGene(symbol: string): Observable<any> {
    return this.http.get(geneUrl + '?symbol=' + symbol);
  }

  public searchStrain(name: string): Observable<any> {
    return this.http.get(strainUrl + '?name=' + name + '&inmmr=y');
  }

  public searchPhenotype(name: string): Observable<any> {
    return this.http.get(phenotypeUrl + '?name=' + name + '&inmmr=y');
  }

  public searchSample(sampleId: string): Observable<any> {
    return this.http.get(sampleUrl + '?sampleId=' + sampleId);
  }

  public queryVariant(paramsIn: any): Observable<any> {

    console.log(paramsIn)

    const genes: string[] = [];
    const strains: string[] = [];
    const phenotypes: string[] = [];
    const samples: string[] = [];
    let max = '';
    let offset = '';
    let rareVar = '';
    let candidateVar = '';
    let confirmedVar = '';
    let varTypes = [];
    let varFuncClasses = [];
    let varImpacts = [];
    let lowQuality = false;

    if (paramsIn.max){
      max = paramsIn.max;
    }
    if (paramsIn.offset) {
      offset = paramsIn.offset;
    }


    if (paramsIn.rareVar){
        rareVar = paramsIn.rareVar
    }

    if (paramsIn.candidateVar){
        candidateVar = paramsIn.candidateVar;
    }

    if (paramsIn.confirmedVar){
        confirmedVar = paramsIn.confirmedVar;
    }

    // if (paramsIn.varType){
    //     varTypes = paramsIn.varType;
    // }
    //
    // if (paramsIn.varFuncClass){
    //     varFuncClasses = paramsIn.varFuncClass;
    // }


    console.log('max = ' + paramsIn.max);
    console.log('selected items');
    console.log(paramsIn.selectedItems);

    if (paramsIn.selectedItems) {
        paramsIn.selectedItems.forEach(item => {
            if (item.selectedType === 'gene') {
                genes.push(item.selectedValue.symbol);
            }

            if (item.selectedType === 'strain') {
                strains.push(item.selectedValue.name);
            }

            if (item.selectedType === 'phenotype') {
                phenotypes.push(item.selectedValue.mpTermName);
            }

            if (item.selectedType === 'sample') {
                samples.push(item.selectedValue.sampleId);
            }

        });
    }
    return this.http.get(variantQueryUrl, {params:
                          {gene: genes,
                                strain:strains,
                                phenotype:phenotypes,
                                sample:samples,
                                rareVar: rareVar,
                                mutantVar: candidateVar,
                                confirmedVar: confirmedVar,
                                type: paramsIn.varType ? paramsIn.varType : [],
                                funcClass: paramsIn.varFuncClass ? paramsIn.varFuncClass : [],
                                impact: paramsIn.varImpact ? paramsIn.varImpact : [],
                                lowQual: paramsIn.lowQual ? paramsIn.lowQual : '',
                                withoutExternalId: paramsIn.withoutExternalId ? paramsIn.withoutExternalId : '',
                                max: max,
                                offset:offset}});
  }

  public getSamples(paramsIn: any): Observable<any> {

      const strains: string[] = [];
      const phenotypes: string[] = [];
      const samples: string[] = [];
      let studies: string[] = [];

      let max = '';
      let offset = '';

      if (paramsIn.max){
          max = paramsIn.max;
      }
      if (paramsIn.offset) {
          offset = paramsIn.offset;
      }

      if (paramsIn.selectedItems){
        paramsIn.selectedItems.forEach(item => {

            if (item.selectedType === 'strain') {
                strains.push(item.selectedValue.name);
            }

            if (item.selectedType === 'phenotype') {
                phenotypes.push(item.selectedValue.mpTermName);
            }

            if (item.selectedType === 'sample') {
                samples.push(item.selectedValue.sampleId);
            }
        });
      }

      if (paramsIn.studies){
          studies = paramsIn.studies
      }
      return this.http.get(sampleQueryUrl, {params:
              {
              strain: strains,
              phenotype: phenotypes,
              sample: samples,
              study: studies,
              max: max,
              offset: offset}});
  }

}
