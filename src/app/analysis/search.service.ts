import {Injectable, ɵregisterNgModuleType} from '@angular/core';
import {HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {File, MMRDBStats} from '../models';
import {forEachComment} from "tslint";
import {environment} from '../../environments/environment';
import {promptGlobalAnalytics} from "@angular/cli/models/analytics";

const geneUrl = environment.MMRDB_API_GENE_URL;
const strainUrl = environment.MMRDB_API_STRAIN_URL;
const phenotypeUrl = environment.MMRDB_API_PHENOTYPE_URL;
const sampleUrl = environment.MMRDB_API_SAMPLE_URL;
const variantQueryUrl = environment.MMRDB_API_VARIANT_SEARCH_URL;
const sampleQueryUrl = environment.MMRDB_API_SAMPLE_URL + '/query';
const sampleStudiesQueryUrl = environment.MMRDB_API_SAMPLE_URL + '/study';
const svVariantQueryUrl = environment.MMRDB_API_SV_VARIANT_SEARCH_URL;
const variantExportCSVUrl = environment.MMRDB_API_VARIANT_EXPORT_CSV_URL;
const svVariantExportCSVUrl = environment.MMRDB_API_SV_VARIANT_EXPORT_CSV_URL;

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    selectedSearchItems: any;
    selectedSearchItemSubject: BehaviorSubject<any>;


    //stats
    mmrdbStats: MMRDBStats;
    mmrdbStatsSubject: BehaviorSubject<MMRDBStats>;

    constructor(private http: HttpClient) {
        this.selectedSearchItems = {}
        this.selectedSearchItemSubject = new BehaviorSubject(this.selectedSearchItems)

        this.mmrdbStats = new MMRDBStats();
        this.mmrdbStatsSubject = new BehaviorSubject(this.mmrdbStats);

    }

    getSelectedSearchItems() {
        return this.selectedSearchItems
    }

    setSelectedSearchItems(searchItems: any) {
        console.log("setting search item")
        console.log(searchItems)

        this.selectedSearchItems = searchItems;
        this.selectedSearchItemSubject.next(searchItems);
    }

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

        return this.sendVariantQueryRequest(paramsIn, variantQueryUrl);
    }

    public exportVariantsToCSV(paramsIn: any) {
        return this.sendVariantQueryRequest(paramsIn, variantExportCSVUrl).subscribe(
            response => this.downloadExportFile(response, 'text/csv'));
    }

    private downloadExportFile(data: any, type: string) {
        let blob = new Blob([data], {type: type});
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert('Please disable your Pop-up blocker and try again.');
        }
        ;
    }

    private sendVariantQueryRequest(paramsIn: any, url: string): Observable<any> {

        console.log(paramsIn)

        const genes: string[] = [];
        const strains: string[] = [];
        const phenotypes: string[] = [];
        const samples: string[] = [];

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
                    phenotypes.push(item.selectedValue.mpTermIdentifier);
                }

                if (item.selectedType === 'sample') {
                    samples.push(item.selectedValue.sampleId);
                }

            });
        }

        const options = {
            gene: genes,
            strain: strains,
            phenotype: phenotypes,
            sample: samples,
            rareVar: paramsIn.rareVar ? paramsIn.rareVar : '',
            mutantVar: paramsIn.candidateVar ? paramsIn.candidateVar : '',
            confirmedVar: paramsIn.confirmedVar ? paramsIn.confirmedVar : '',
            type: paramsIn.varType ? paramsIn.varType : [],
            funcClass: paramsIn.varFuncClass ? paramsIn.varFuncClass : [],
            impact: paramsIn.varImpact ? paramsIn.varImpact : [],
            lowQual: paramsIn.lowQual ? paramsIn.lowQual : false,
            withoutExternalId: paramsIn.withoutExternalId ? paramsIn.withoutExternalId : '',
            max: paramsIn.max ? paramsIn.max : '',
            offset: paramsIn.offset ? paramsIn.offset : '',
            sortBy: paramsIn.sortBy ? paramsIn.sortBy : '',
            sortDirection: paramsIn.sortDirection ? paramsIn.sortDirection : ''
        }


        if (url === variantExportCSVUrl) {
            return this.http.get(url, {responseType: 'arraybuffer', params: options});
        } else {
            return this.http.get(url, {params: options});
        }

    }

    public querySvVariant(paramsIn: any): Observable<any> {

        return this.sendSvVariantQueryRequest(paramsIn, svVariantQueryUrl);
    }

    public exportSvVariantsToCSV(paramsIn: any) {
        return this.sendSvVariantQueryRequest(paramsIn, svVariantExportCSVUrl).subscribe(
            response => this.downloadExportFile(response, 'text/csv'));
    }

    private sendSvVariantQueryRequest(paramsIn: any, url: string): Observable<any> {
        console.log(paramsIn)

        const genes: string[] = [];
        const strains: string[] = [];
        const phenotypes: string[] = [];
        const samples: string[] = [];

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
        const options = {
            gene: genes,
            strain: strains,
            phenotype: phenotypes,
            sample: samples,
            rareVar: paramsIn.rareVar ? paramsIn.rareVar : '',
            mutantVar: paramsIn.candidateVar ? paramsIn.candidateVar : '',
            confirmedVar: paramsIn.confirmedVar ? paramsIn.confirmedVar : '',
            type: paramsIn.varType ? paramsIn.varType : [],
            funcClass: paramsIn.varFuncClass ? paramsIn.varFuncClass : [],
            impact: paramsIn.varImpact ? paramsIn.varImpact : [],
            lowQual: paramsIn.lowQual ? paramsIn.lowQual : false,
            withoutExternalId: paramsIn.withoutExternalId ? paramsIn.withoutExternalId : '',
            inExon: paramsIn.inExon ? paramsIn.inExon : '',
            max: paramsIn.max ? paramsIn.max : '',
            offset: paramsIn.offset ? paramsIn.offset : '',
            sortBy: paramsIn.sortBy ? paramsIn.sortBy : '',
            sortDirection: paramsIn.sortDirection ? paramsIn.sortDirection : ''
        }


        if (url === svVariantExportCSVUrl) {
            return this.http.get(url, {responseType: 'arraybuffer', params: options});
        } else {
            return this.http.get(url, {params: options});
        }
    }

    public getSamples(paramsIn: any): Observable<any> {

        const strains: string[] = [];
        const phenotypes: string[] = [];
        const samples: string[] = [];
        let studies: string[] = [];

        let max = '';
        let offset = '';

        if (paramsIn.max) {
            max = paramsIn.max;
        }
        if (paramsIn.offset) {
            offset = paramsIn.offset;
        }

        if (paramsIn.selectedItems) {
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

        if (paramsIn.study && paramsIn.study !== 'All') {
            studies = paramsIn.study
        }
        return this.http.get(sampleQueryUrl, {
            params:
                {
                    strain: strains,
                    phenotype: phenotypes,
                    sample: samples,
                    study: studies,
                    max: max,
                    offset: offset
                }
        });
    }

    getStats() {

        //TODO consolidate these service calls to a single request, and use stats domain when available.
        if (this.mmrdbStats.exomeSamplesCount === -1) {
            this.http.get<any>(sampleQueryUrl, {params: {study: 'MMR', max: '1'}}).subscribe(data => {
                this.mmrdbStats.exomeSamplesCount = data.sampleCount;
                this.mmrdbStatsSubject.next(this.mmrdbStats)
            });
        }

        if (this.mmrdbStats.wholeGenomeSamplesCount === -1) {
            this.http.get<any>(sampleQueryUrl, {params: {study: 'MMR-WGS', max: '1'}}).subscribe(data => {
                this.mmrdbStats.wholeGenomeSamplesCount = data.sampleCount;
                this.mmrdbStatsSubject.next(this.mmrdbStats)
            });
        }

        if (this.mmrdbStats.snpIndelVariantsCount === -1) {
            this.http.get<any>(variantQueryUrl, {params: {max: '1'}}).subscribe(data => {
                this.mmrdbStats.snpIndelVariantsCount = data.variantCount;
                this.mmrdbStatsSubject.next(this.mmrdbStats)
            });
        }

        if (this.mmrdbStats.svVariantsCount === -1) {
            this.http.get<any>(svVariantQueryUrl, {params: {max: '1'}}).subscribe(data => {
                this.mmrdbStats.svVariantsCount = data.svVariantCount;
                this.mmrdbStatsSubject.next(this.mmrdbStats)
            });
        }

        if (this.mmrdbStats.strainCount === -1) {
            this.http.get<any>(strainUrl, {params: {inmmr: 'y'}}).subscribe(data => {
                this.mmrdbStats.strainCount = data.strainCount;
                this.mmrdbStatsSubject.next(this.mmrdbStats)
            });
        }

        console.log('this.mmrdbStats.confirmedSnpIndelMutationCount = ' + this.mmrdbStats.confirmedSnpIndelMutationCount)
        if (this.mmrdbStats.confirmedSnpIndelMutationCount === -1) {
            this.http.get<any>(variantQueryUrl, {params: {confirmedVar: 'true', max: '1'}}).subscribe(data => {
                this.mmrdbStats.confirmedSnpIndelMutationCount = data.variantCount;
                this.mmrdbStatsSubject.next(this.mmrdbStats)
            });
        }

        if (this.mmrdbStats.confirmedSVMutationCount === -1) {
            this.http.get<any>(svVariantQueryUrl, {params: {confirmedVar: 'true', max: '1'}}).subscribe(data => {
                this.mmrdbStats.confirmedSVMutationCount = data.svVariantCount;
                this.mmrdbStatsSubject.next(this.mmrdbStats)
            });
        }

        if (this.mmrdbStats.snpIndelCandidateCount === -1) {
            this.http.get<any>(variantQueryUrl, {params: {mutantVar: 'true', max: '1'}}).subscribe(data => {
                this.mmrdbStats.snpIndelCandidateCount = data.variantCount;
                this.mmrdbStatsSubject.next(this.mmrdbStats)
            });
        }

        if (this.mmrdbStats.svMutantCandidateCount === -1) {
            this.http.get<any>(svVariantQueryUrl, {params: {mutantVar: 'true', max: '1'}}).subscribe(data => {
                this.mmrdbStats.svMutantCandidateCount = data.svVariantCount;
                this.mmrdbStatsSubject.next(this.mmrdbStats)
            });
        }

    }

    getSampleStudies(): Observable<any> {
        return this.http.get(sampleStudiesQueryUrl)
    }
}
