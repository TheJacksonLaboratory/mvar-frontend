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
const sampleStatsUrl = environment.MMRDB_API_SAMPLE_STATS_URL;
const dbStatsUrl = environment.MMRDB_API_DB_STATS_URL;
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

    public getSampleStatistics(sampleId: number): Observable<any> {
        return this.http.get(sampleStatsUrl + '/' + sampleId);
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
            chr: paramsIn.chr ? paramsIn.chr : '',
            startPos: paramsIn.startPos ? paramsIn.startPos : '',
            endPos: paramsIn.endPos ? paramsIn.endPos : '',
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
            offset: paramsIn.offset ? paramsIn.offset : '',
            chr: paramsIn.chr ? paramsIn.chr : '',
            startPos: paramsIn.startPos ? paramsIn.startPos : '',
            endPos: paramsIn.endPos ? paramsIn.endPos : '',
            max: paramsIn.max ? paramsIn.max : '',
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
                    offset: offset,
                    sortBy: paramsIn.sortBy ? paramsIn.sortBy : '',
                    sortDirection: paramsIn.sortDirection ? paramsIn.sortDirection : ''
                }
        });
    }

    getStats() {

        this.http.get<any>(dbStatsUrl, {params: {max: '-1'}}).subscribe(data => {

            console.log(data)
            for (let indx in data) {
                switch (data[indx].name) {
                    case 'WES_SAMPLE_COUNT':
                        this.mmrdbStats.exomeSamplesCount = data[indx].statValue;
                        break;

                    case 'WGS_SAMPLE_COUNT':
                        this.mmrdbStats.wholeGenomeSamplesCount = data[indx].statValue;
                        break;

                    case 'SNP_VARIANTS':
                        this.mmrdbStats.snpVariantsCount = data[indx].statValue;
                        break;

                    case 'INDEL_VARIANTS':
                        this.mmrdbStats.indelVariantsCount = data[indx].statValue;
                        break;

                    case 'STRUCT_VARIANTS':
                        this.mmrdbStats.svVariantsCount = data[indx].statValue;
                        break;

                    case 'SEQ_MOUSE_STRAIN':
                        this.mmrdbStats.strainCount = data[indx].statValue;
                        break;

                    case 'SNP_VARIANTS_CONFIRMED':
                        this.mmrdbStats.confirmedSnpMutationCount = data[indx].statValue;
                        break;

                    case 'INDEL_VARIANTS_CONFIRMED':
                        this.mmrdbStats.confirmedIndelMutationCount = data[indx].statValue;
                        break;

                    case 'STRUCT_VARIANTS_CONFIRMED':
                        this.mmrdbStats.confirmedSVMutationCount = data[indx].statValue;
                        break;

                    case 'SNP_VARIANTS_CANDIDATE':
                        this.mmrdbStats.snpCandidateCount = data[indx].statValue;
                        break;

                    case 'INDEL_VARIANTS_CANDIDATE':
                        this.mmrdbStats.indelCandidateCount = data[indx].statValue;
                        break;

                    case 'STRUCT_VARIANTS_CANDIDATE':
                        this.mmrdbStats.svCandidateCount = data[indx].statValue;
                        break;
                }
            }
        });

        console.log(this.mmrdbStats)
    }

    getSampleStudies(): Observable<any> {
        return this.http.get(sampleStudiesQueryUrl)
    }
}
