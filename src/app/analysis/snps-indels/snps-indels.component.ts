import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Variant} from '../../models';
import {SearchService} from '../search.service';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import {HelpDialogComponent} from '../dialogs/help-dialog/help-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerDialogComponent} from '../../components/spinner-dialog/spinner-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-snps-indels',
    templateUrl: './snps-indels.component.html',
    styleUrls: ['./snps-indels.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class SnpsIndelsComponent implements AfterViewInit, OnInit {

    @ViewChild('varPaginator', {static: true}) varPaginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    // Table items
    displayedColumns = ['caid', 'chr', 'symbol', 'hgvs', 'type', 'functionalClassCode'];

    varDataSource: Variant[] = [];
    varCount: number;

    // MatPaginator Inputs
    pageLength = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100];

    // searchparams
    currSearchParams: any = {}

    showVarFilters = false;
    enableFilters = false;

    expandedElement: Variant | null;

    dialogRef: any;
    spinnerDialogRef: any;

    constructor(private searchService: SearchService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) {
    }

    ngOnInit() {

        this.route.paramMap.subscribe(paramsIn => {

            const variant = paramsIn.get('variant');

            if (variant) {

                this.currSearchParams.selectedItems = this.searchService.getSelectedSearchItems;

                this._queryVariants(this.currSearchParams);
            }
        });
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => {

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

        this.currSearchParams.offset = 0;
        this.varPaginator.pageIndex = 0;
        this.clearSort();

        if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0) ||
            (searchCriteria.hgvs && searchCriteria.hgvs > 0) ||
            (searchCriteria.mvarId && searchCriteria.mvarId.length > 0) ||
             searchCriteria.chr
           ) {

            this.currSearchParams = searchCriteria;
            this._queryVariants(this.currSearchParams);
        } else {
            this.varDataSource = []
            this.varCount = 0
            this.pageLength = 0
            this.enableFilters = false;
            this.showVarFilters = false;
        }
    }

    private clearSort() {
        this.sort.sort({id: '', start: 'asc', disableClear: false});
    }

    private _queryVariants(params: any) {
        this.openSpinnerDialog();
        this.searchService.queryVariant(params).subscribe(data => {

            const temp = data.variants as Variant[];

            // TODO:  Below code seems unnecessary. Instead load variation details on demand in the SNP-indel details component

            temp.forEach(variant => {
                // set impact at variant level and the list of impacts for all transcript
                variant.impacts = variant.impact;
                variant.impact = variant.impact.split(',')[0]
                // set annotation at variant level and the list of annotations for all transcripts
                variant.functionalClassCodes = variant.functionalClassCode;
                variant.functionalClassCode = variant.functionalClassCode.split(',')[0];
                // search for annotation in Sequence Ontology table and get SO id
                // TODO Move search of transcrip relating information to the snp-detail component instead of
                // loading all the data at once in this component
                this.searchService.searchAnnotation(variant.functionalClassCode).subscribe(annotation => {
                    if (annotation && annotation.length > 0) {
                        variant.functionalClassSOid = annotation[0].soId;
                    }
                });
            });
            this.varDataSource = temp;

            this.varCount = data.variantCount;
            this.pageLength = this.varCount;
            this.varPaginator.pageSize = params.max;
            this.enableFilters = true;
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
        if (this.enableFilters) {
            this.showVarFilters = !this.showVarFilters;
        }
    }

    expandCollapse(element: any) {
        this.expandedElement = this.expandedElement === element ? null : element

    }

    exportCSV() {
        const exportSearchCriteria = this.currSearchParams;
        if (this.varCount && this.varCount > 0) {
            exportSearchCriteria.offset = 0;
            exportSearchCriteria.max = this.varCount;

            if (confirm(this.varCount + ' records will be exported to a CSV file, do you want to continue?')) {
                this.searchService.exportVariantsToCSV(exportSearchCriteria);
            }
        }
    }

    openHelpDialog() {
        this.dialogRef = this.dialog.open(HelpDialogComponent, {
            width: '50%', height: '50%',
            data: {
                helpType: 'SNPandIndelGeneral'
            }
        });
    }

    openSpinnerDialog() {
        this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
                panelClass: 'transparent',
                disableClose: true
        });
    }

    showStrainDistribution() {
        this.router.navigate(['/strain-variant'])
    }

}


