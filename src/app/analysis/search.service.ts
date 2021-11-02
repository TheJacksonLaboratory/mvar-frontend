import {Injectable, ɵregisterNgModuleType} from '@angular/core';
import {HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {File, MVARStat} from '../models';
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
const mvarStatUrl = environment.MVAR_API_STAT_URL;
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
    source = 'Sanger_V7'; // TODO link this variable to a combobox on the variant/strain UI
    // source = 'SNPGrid_V1';


    //stats
    mvarStat: MVARStat;
    mvarStatSubject: BehaviorSubject<MVARStat>;

    constructor(private http: HttpClient) {
        this.selectedSearchItems = {}
        this.selectedSearchItemSubject = new BehaviorSubject(this.selectedSearchItems)

        this.mvarStat = new MVARStat();
        this.mvarStatSubject = new BehaviorSubject(this.mvarStat);

        this.loadSequencedStrains();
    }

    loadSequencedStrains() {
        if (! this.seqStrainsSource) {
            this.seqStrainsSource = this.http.get(variantStrainUrl + '/strainsInDB?source=' + this.source)
        }
        return this.seqStrainsSource
    }

    setSource(source: string) {
        this.source = source;
    }

    getSelectedSearchItems() {
        return this.selectedSearchItems
    }

    setSelectedSearchItems(searchItems: any) {
        console.log(searchItems)

        this.selectedSearchItems = searchItems;
        this.selectedSearchItemSubject.next(searchItems);
    }

    public searchGene(symbol: string): Observable<any> {
        return this.http.get(geneUrl + '?symbol=' + symbol);
    }

    public searchMvarGene(symbol: string): Observable<any> {
        return this.http.get(geneUrl + '?symbol=' + symbol + "&mvar=true");
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

    public searchAnnotation(label: string): Observable<any> {
        return this.http.get(sequenceOntologyUrl + '?label=' + label);
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
        const dbSNPidList: string[] = [];

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
                if (item.selectedType === 'dbSNPid') {
                    dbSNPidList.push(item.selectedValue);
                }
            });
        }

        const options = {
            gene: genes,
            type: paramsIn.varType ? paramsIn.varType : [],
            consequence: paramsIn.consequence ? paramsIn.consequence : [],
            hgvs: hgvsList,
            mvarId: mvarIdList,
            dbSNPid: dbSNPidList,
            impact: paramsIn.varImpact ? paramsIn.varImpact : [],
            chr: paramsIn.chr ? paramsIn.chr : '',
            startPos: paramsIn.startPos ? paramsIn.startPos : '',
            endPos: paramsIn.endPos ? paramsIn.endPos : '',
            // default set to 0
            imputed: '0',
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
        if (this.mvarStat.alleleCount === -1) {
            this.http.get<any>(mvarStatUrl).subscribe(data => {
                console.log(data);
                this.mvarStat.alleleCount = data[0].alleleCount;
                this.mvarStat.geneCount = data[0].geneCount;
                this.mvarStat.strainCount = data[0].strainCount;
                this.mvarStat.transcriptCount = data[0].transcriptCount;
                this.mvarStat.variantCanonIdentifierCount = data[0].variantCanonIdentifierCount;
                this.mvarStat.variantCount = data[0].variantCount;
                this.mvarStat.variantStrainCount = data[0].variantStrainCount;
                this.mvarStat.variantTranscriptCount = data[0].variantTranscriptCount;
                this.mvarStat.variantCanonIdentifierCount = data[0].variantCanonIdentifierCount;
                this.mvarStat.geneAnalysisCount = data[0].geneAnalysisCount;
                this.mvarStat.strainAnalysisCount = data[0].strainAnalysisCount;
                this.mvarStat.transcriptAnalysisCount = data[0].transcriptAnalysisCount;
                this.mvarStatSubject.next(this.mvarStat);
            });
        }
    }

    getVariantStrains(paramsIn: any): Observable<any> {

        const genes: string[] = [];
        const hgvsList: string[] = [];
        const mvarIdList: string[] = [];
        const dbSNPidList: string[] = [];

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
                if (item.selectedType === 'dbSNPid') {
                    dbSNPidList.push(item.selectedValue);
                }
            });
        }

        const options = {
            source: this.source,
            gene: genes,
            type: paramsIn.varType ? paramsIn.varType : [],
            consequence: paramsIn.consequence ? paramsIn.consequence : [],
            impact: paramsIn.varImpact ? paramsIn.varImpact : [],
            hgvs: hgvsList,
            mvarId: mvarIdList,
            dbSNPid: dbSNPidList,
            chr: paramsIn.chr ? paramsIn.chr : '',
            imputed: '0',
            startPos: paramsIn.startPos ? paramsIn.startPos : '',
            endPos: paramsIn.endPos ? paramsIn.endPos : '',
            max: paramsIn.max ? paramsIn.max : '',
            offset: paramsIn.offset ? paramsIn.offset : ''
        }

        return this.http.get(variantStrainUrl + '/query', {params: options});

    }
}
