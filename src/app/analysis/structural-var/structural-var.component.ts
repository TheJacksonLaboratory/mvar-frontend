import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SvVariant} from '../../models';
import {SearchService} from '../search.service';
import {MatPaginator} from "@angular/material";
import {ActivatedRoute} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {HelpDialogComponent} from '../dialogs/help-dialog/help-dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SpinnerDialogComponent} from '../../components/spinner-dialog/spinner-dialog.component';


@Component({
    selector: 'app-structural-var',
    templateUrl: './structural-var.component.html',
    styleUrls: ['./structural-var.component.scss']
})
export class StructuralVarComponent implements AfterViewInit, OnInit {

    @ViewChild('varPaginator', {static: true}) varPaginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    //Table items
    displayedColumns = ['svType', 'pos', 'endPos', 'svLength', 'sampleCount', 'varFreq', 'inExon', 'supp', 'mutantCandidate', 'sampleId'];
    svVarDataSource: SvVariant[] = [];
    varCount: number;

    // MatPaginator Inputs
    pageLength = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100, 500];

    showVarFilters = false;

    //searchparams
    currSearchParams: any = {}

    spinnerDialogRef: any;

    constructor(private searchService: SearchService, private route: ActivatedRoute, public dialog: MatDialog) {
    }

    ngOnInit() {

        const params: any = {};

        this.route.paramMap.subscribe(paramsIn => {
            console.log(paramsIn.get('sample'));

            const candidateVar = paramsIn.get('candidateVar');
            if (candidateVar) {
                this.currSearchParams.candidateVar = true;
            }

            const rareVar = paramsIn.get('rareVar');
            if (rareVar) {
                this.currSearchParams.rareVar = true;
            }

            const confirmedVar = paramsIn.get('confirmedVar');
            if (confirmedVar) {
                this.currSearchParams.confirmedVar = true;
            }

            const sample = paramsIn.get('sample');
            if (sample) {

                this.currSearchParams.selectedItems = [{
                    selectedType: 'sample',
                    selectedValue: {sampleId: sample},
                    displayedValue: paramsIn.get('sample')
                }];

                this._queryVariants(this.currSearchParams);
            }
        });
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => {
            console.log('sort changed')
            this.currSearchParams.sortBy = this.sort.active;
            this.currSearchParams.sortDirection = this.sort.direction;
            this.currSearchParams.offset = 0;
            this.varPaginator.pageIndex = 0;

            if (this.currSearchParams.selectedItems) {
                if (this.sort.active && this.currSearchParams.selectedItems.length > 0) {
                    this._queryVariants(this.currSearchParams)
                }
            }
        });
    }


    public onSearchCriteriaChange(searchCriteria: any) {
        console.log('search criteria changed')
        const params: any = {};
        this.currSearchParams.offset = 0;
        this.varPaginator.pageIndex = 0;
        this.clearSort();

        if (searchCriteria.selectedItems.length > 0) {
            this.currSearchParams.selectedItems = searchCriteria.selectedItems;
            this._queryVariants(this.currSearchParams);
        } else {
            this.svVarDataSource = []
            this.varCount = 0
            this.pageLength = 0
        }
    }

    private clearSort() {
        this.sort.sort({id: '', start: 'asc', disableClear: false});
    }

    private _queryVariants(params: any) {
        this.openSpinnerDialog();
        this.searchService.querySvVariant(params).subscribe(data => {

            this.svVarDataSource = data.svVariants as SvVariant[];
            this.varCount = data.svVariantCount;
            this.pageLength = this.varCount;

            console.log('var count = ' + this.varCount)
            console.log(this.svVarDataSource);

            this.spinnerDialogRef.close();
        },
        (error) => {
            this.spinnerDialogRef.close();
        });
    }

    doPageChange(pageEvent: any) {

        if (this.currSearchParams) {
            this.currSearchParams.offset = pageEvent.pageIndex * pageEvent.pageSize;
            this.currSearchParams.max = pageEvent.pageSize;
            this._queryVariants(this.currSearchParams);
        }
    }

    showFilters() {
        if (this.showVarFilters) {
            this.showVarFilters = false;
        } else {
            this.showVarFilters = true;
        }
    }

    exportCSV(){
        const exportSearchCriteria = this.currSearchParams;
        if (this.varCount && this.varCount > 0){
            exportSearchCriteria.offset = 0;
            exportSearchCriteria.max = this.varCount;

            if (confirm(this.varCount + " structural variant records will be exported to a CSV file, do you want to continue?")){
                this.searchService.exportSvVariantsToCSV(exportSearchCriteria);
            }
        }
    }

    openHelpDialog() {
        console.log("open help dialog");
        const dialogRef = this.dialog.open(HelpDialogComponent, {
            width: '50%', height: '50%',
            data: {
                helpType: 'SVGeneral'
            }
        });
    }

    openSpinnerDialog() {
        console.log("open spinner dialog");
        this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
            panelClass: 'transparent',
            disableClose: true
        });
    }

    getSvLength(lengthIn: string){
        let length: number;

        if (lengthIn) {
            length = +lengthIn;
            if (length === 0) {
                return 'N/A'
            } else {
                return Math.abs(length)
            }
        } else {
            return length;
        }
    }

}
