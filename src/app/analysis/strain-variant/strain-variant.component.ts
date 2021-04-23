import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../search.service';
import {MatDialog, MatPaginator} from '@angular/material';
import {servicebroker_v1} from "googleapis";
import { Router } from '@angular/router';
import { HelpDialogComponent } from '../dialogs/help-dialog/help-dialog.component';


@Component({
    selector: 'app-strain-variant',
    templateUrl: './strain-variant.component.html',
    styleUrls: ['./strain-variant.component.scss']
})
export class StrainVariantComponent implements OnInit {

    @ViewChild('varPaginator', {static: true}) varPaginator: MatPaginator;

    searchOption = 'strain-variant';
    currSearchParams: any = {};

    seqStrains: any[] = [];
    displayColumns: any[];
    dataSource: any[] = [];
    displayedColumns: string[];
    showVarFilters = false;
    enableFilters = false;

    dialogRef: any;

    // MatPaginator Inputs
    pageLength = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100];

    constructor(private searchService: SearchService, private router: Router, public dialog: MatDialog,) {
    }


    ngOnInit() {

        this.searchService.loadSequencedStrains().subscribe(data => {
            this.seqStrains = data.strains;
            this.searchService.seqStrains = data.strains;
            this.displayColumns = this.seqStrains
            this.displayedColumns = this.seqStrains.map(seqStrain => seqStrain.strain);
        });

        const storedSearchParameters = this.searchService.getSelectedSearchItems();
        if (storedSearchParameters) {
            this.currSearchParams = storedSearchParameters;
        }
    }

    loadVariantStrainData() {

        this.searchService.getVariantStrains(this.currSearchParams).subscribe(
            data => {
                this.dataSource = data.variants as any[]
                this.pageLength = data.variantCount;
                this.setStrainMap()
                if (this.dataSource.length > 0){
                    this.enableFilters = true;
                }else {
                    this.enableFilters = false;
                }

            }
        );
    }

    setStrainMap() {
        this.dataSource.forEach(variant => {
            const strainMap = new Map();
            variant.strains.forEach(strain => {

                const altAllele = this.findAtlAllele(variant, strain)
                strainMap.set(strain.id, altAllele)
            });
            variant.strainMap = strainMap;
        });
    }

    findAtlAllele(variant: any, strain: any) {
        if (strain.genotype === './.') {
            return '';  // unknown

        } else if (strain.genotype === '0/0') {
            return variant.ref;  // no change

        } else {
            return variant.alt;  // alt allele(s)
        }
    }

    public onSearchCriteriaChange(searchCriteria: any) {

        console.log('WE ARE HERE CRITERIA CHANGE AT STRAIN VARIANT')

        const params: any = {};
        this.currSearchParams.offset = 0;

        if (searchCriteria.selectedItems.length > 0) {
            this.currSearchParams.selectedItems = searchCriteria.selectedItems;
            this.loadVariantStrainData();
        } else {
            this.dataSource = []
            // this.varCount = 0
            this.pageLength = 0
        }
    }

    doPageChange(pageEvent: any) {

        if (this.currSearchParams) {
            this.currSearchParams.offset = pageEvent.pageIndex * pageEvent.pageSize;
            this.currSearchParams.max = pageEvent.pageSize;
            this.loadVariantStrainData();
        }
    }

    showFilters() {
        if (this.enableFilters) {
            if (this.showVarFilters) {
                this.showVarFilters = false;
            } else {
                this.showVarFilters = true;
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

    public showSNPIndels() {
        this.searchService.setSelectedSearchItems(this.currSearchParams);
        this.router.navigate(['/variant'])
    }
}
