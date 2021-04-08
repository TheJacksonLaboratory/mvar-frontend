import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../search.service';
import {MatPaginator} from '@angular/material';


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

    // MatPaginator Inputs
    pageLength = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100];

    constructor(private searchService: SearchService) {
    }


    ngOnInit() {

        this.searchService.loadSequencedStrains().subscribe(data => {
            this.seqStrains = data.strains;
            this.searchService.seqStrains = data.strains;
            this.displayColumns = this.seqStrains
            this.displayedColumns = this.seqStrains.map(seqStrain => seqStrain.strain);
        });
    }

    loadVariantStrainData() {

        this.searchService.getVariantStrains(this.currSearchParams).subscribe(
            data => {
                this.dataSource = data.variants as any[]
                this.pageLength = data.variantCount;
                this.setStrainMap()

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
}
