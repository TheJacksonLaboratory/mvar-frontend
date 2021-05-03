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
const transcriptUrl = environment.MVAR_API_TRANSCRIPT_URL;
const alleleUrl = environment.MVAR_API_ALLELE_URL;
const sequenceOntologyUrl = environment.MVAR_API_SEQUENCE_ONTOLOGY_URL;
const phenotypeUrl = environment.MVAR_API_PHENOTYPE_URL;
const variantUrl = environment.MVAR_API_VARIANT_URL;
const variantQueryUrl = environment.MVAR_API_VARIANT_SEARCH_URL;
const mvarStatsUrl = environment.MVAR_API_STATS_URL;
const variantExportCSVUrl = environment.MVAR_API_VARIANT_EXPORT_CSV_URL;
const variantStrainUrl = environment.MVAR_API_VARIANT_STRAIN_URL;

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    selectedSearchItems: any;
    selectedSearchItemSubject: BehaviorSubject<any>;
    seqStrainsSource: Observable<any>;
    seqStrains: any[] = [];

    //stats
    mvarStats: MVARStats;
    mvarStatsSubject: BehaviorSubject<MVARStats>;

    constructor(private http: HttpClient) {
        this.selectedSearchItems = {}
        this.selectedSearchItemSubject = new BehaviorSubject(this.selectedSearchItems)

        this.mvarStats = new MVARStats();
        this.mvarStatsSubject = new BehaviorSubject(this.mvarStats);

        this.loadSequencedStrains();
    }

    loadSequencedStrains() {
        if (! this.seqStrainsSource) {
            this.seqStrainsSource = this.http.get(variantStrainUrl + '/strains')
        }
        return this.seqStrainsSource
    }

    getSelectedSearchItems() {
        return this.selectedSearchItems
    }

    setSelectedSearchItems(searchItems: any) {
        console.log("****** STORED SEARCH ITEMS ******")
        console.log(searchItems)

        this.selectedSearchItems = searchItems;
        this.selectedSearchItemSubject.next(searchItems);
    }

    public searchGene(symbol: string): Observable<any> {
        return this.http.get(geneUrl + '?symbol=' + symbol);
    }

    public searchStrain(name: string): Observable<any> {
        return this.http.get(strainUrl + '?name=' + name);
    }

    public searchTranscript(id: string): Observable<any> {
        return this.http.get(transcriptUrl + '?primary_identifier=' + id);
    }

    public searchAllele(name: string): Observable<any> {
        return this.http.get(alleleUrl + '?symbol=' + name);
    }

    public searchAnnotation(name: string): Observable<any> {
        return this.http.get(sequenceOntologyUrl + '?name=' + name);
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

        //console.log(paramsIn)

        const genes: string[] = [];
        const hgvsList: string[] = [];
        const mvarIdList: string[] = [];

        if (paramsIn.selectedItems) {
            paramsIn.selectedItems.forEach(item => {
                if (item.selectedType === 'gene') {
                    genes.push(item.selectedValue.symbol);
                }
                if (item.selectedType === 'hgvs') {
                    hgvsList.push(item.selectedValue);
                }
                if (item.selectedType === 'mvarId') {
                    mvarIdList.push(item.selectedValue);
                }
            });
        }

        const options = {
            gene: genes,
            type: paramsIn.varType ? paramsIn.varType : [],
            consequence: paramsIn.consequence ? paramsIn.consequence : [],
            hgvs: hgvsList,
            mvarId: mvarIdList,
            impact: paramsIn.varImpact ? paramsIn.varImpact : [],
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

    getStats() {
        if (this.mvarStats.alleleCount === -1) {
            this.http.get<any>(mvarStatsUrl).subscribe(data => {
                console.log(data);
                this.mvarStats.alleleCount = data[0].alleleCount;
                this.mvarStats.geneCount = data[0].geneCount;
                this.mvarStats.strainCount = data[0].strainCount;
                this.mvarStats.transcriptCount = data[0].transcriptCount;
                this.mvarStats.variantCanonIdentifierCount = data[0].variantCanonIdentifierCount;
                this.mvarStats.variantCount = data[0].variantCount;
                this.mvarStats.variantStrainCount = data[0].variantStrainCount;
                this.mvarStats.variantTranscriptCount = data[0].variantTranscriptCount;
                this.mvarStats.variantCanonIdentifierCount = data[0].variantCanonIdentifierCount;
                this.mvarStats.geneAnalysisCount = data[0].geneAnalysisCount;
                this.mvarStats.strainAnalysisCount = data[0].strainAnalysisCount;
                this.mvarStats.transcriptAnalysisCount = data[0].transcriptAnalysisCount;
                this.mvarStatsSubject.next(this.mvarStats);
            });
        }
    }

    getVariantStrains(paramsIn: any): Observable<any> {

        const genes: string[] = [];
        const hgvsList: string[] = [];
        const mvarIdList: string[] = [];

        if (paramsIn.selectedItems) {
            paramsIn.selectedItems.forEach(item => {
                if (item.selectedType === 'gene') {
                    genes.push(item.selectedValue.symbol);
                }
                if (item.selectedType === 'hgvs') {
                    hgvsList.push(item.selectedValue);
                }
                if (item.selectedType === 'mvarId') {
                    mvarIdList.push(item.selectedValue);
                }
            });
        }

        const options = {
            gene: genes,
            type: paramsIn.varType ? paramsIn.varType : [],
            consequence: paramsIn.consequence ? paramsIn.consequence : [],
            impact: paramsIn.varImpact ? paramsIn.varImpact : [],
            hgvs: hgvsList,
            mvarId: mvarIdList,
            chr: paramsIn.chr ? paramsIn.chr : '',
            startPos: paramsIn.startPos ? paramsIn.startPos : '',
            endPos: paramsIn.endPos ? paramsIn.endPos : '',
            max: paramsIn.max ? paramsIn.max : '',
            offset: paramsIn.offset ? paramsIn.offset : ''
        }

        return this.http.get(variantStrainUrl + '/query', {params: options});

    }
}
