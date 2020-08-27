import {Injectable, ɵregisterNgModuleType} from '@angular/core';
import {HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {File, MVARStats} from '../models';
import {forEachComment} from "tslint";
import {environment} from '../../environments/environment';
import {promptGlobalAnalytics} from "@angular/cli/models/analytics";

const geneUrl = environment.MVAR_API_GENE_URL;
const strainUrl = environment.MVAR_API_STRAIN_URL;
const phenotypeUrl = environment.MVAR_API_PHENOTYPE_URL;
const variantUrl = environment.MVAR_API_VARIANT_URL;
const variantQueryUrl = environment.MVAR_API_VARIANT_SEARCH_URL;
const variantExportCSVUrl = environment.MVAR_API_VARIANT_EXPORT_CSV_URL;

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    selectedSearchItems: any;
    selectedSearchItemSubject: BehaviorSubject<any>;


    //stats
    mvarStats: MVARStats;
    mvarStatsSubject: BehaviorSubject<MVARStats>;

    constructor(private http: HttpClient) {
        this.selectedSearchItems = {}
        this.selectedSearchItemSubject = new BehaviorSubject(this.selectedSearchItems)

        this.mvarStats = new MVARStats();
        this.mvarStatsSubject = new BehaviorSubject(this.mvarStats);

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
        return this.http.get(variantUrl + '?gene=' + symbol);
    }

    public searchStrain(name: string): Observable<any> {
        return this.http.get(variantUrl + '?name=' + name);
    }

    // public searchPhenotype(name: string): Observable<any> {
    //     return this.http.get(phenotypeUrl + '?name=' + name + '&inmmr=y');
    // }

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

            });
        }

        const options = {
            gene: genes,
            strain: strains,
            // phenotype: phenotypes,
            // rareVar: paramsIn.rareVar ? paramsIn.rareVar : '',
            // mutantVar: paramsIn.candidateVar ? paramsIn.candidateVar : '',
            // confirmedVar: paramsIn.confirmedVar ? paramsIn.confirmedVar : '',
            type: paramsIn.varType ? paramsIn.varType : [],
            funcClass: paramsIn.varFuncClass ? paramsIn.varFuncClass : [],
            // impact: paramsIn.varImpact ? paramsIn.varImpact : [],
            // lowQual: paramsIn.lowQual ? paramsIn.lowQual : false,
            // withoutExternalId: paramsIn.withoutExternalId ? paramsIn.withoutExternalId : '',
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

    getStats() {

        //TODO consolidate these service calls to a single request, and use stats domain when available.
        if (this.mvarStats.snpIndelVariantsCount === -1) {
            this.http.get<any>(variantQueryUrl, {params: {max: '1'}}).subscribe(data => {
                this.mvarStats.snpIndelVariantsCount = data.variantCount;
                this.mvarStatsSubject.next(this.mvarStats)
            });
        }

        if (this.mvarStats.strainCount === -1) {
            this.http.get<any>(strainUrl, {params: {inmmr: 'y'}}).subscribe(data => {
                this.mvarStats.strainCount = data.strainCount;
                this.mvarStatsSubject.next(this.mvarStats)
            });
        }

        console.log('this.mvarStats.confirmedSnpIndelMutationCount = ' + this.mvarStats.confirmedSnpIndelMutationCount)
        if (this.mvarStats.confirmedSnpIndelMutationCount === -1) {
            this.http.get<any>(variantQueryUrl, {params: {confirmedVar: 'true', max: '1'}}).subscribe(data => {
                this.mvarStats.confirmedSnpIndelMutationCount = data.variantCount;
                this.mvarStatsSubject.next(this.mvarStats)
            });
        }

        if (this.mvarStats.snpIndelCandidateCount === -1) {
            this.http.get<any>(variantQueryUrl, {params: {mutantVar: 'true', max: '1'}}).subscribe(data => {
                this.mvarStats.snpIndelCandidateCount = data.variantCount;
                this.mvarStatsSubject.next(this.mvarStats)
            });
        }

    }

}
