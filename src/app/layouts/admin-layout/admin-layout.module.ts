import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';


import {FilesNavComponent} from '../../files-nav/files-nav.component';
import {UploadDialogComponent} from '../../files-nav/upload-dialog/upload-dialog.component';
import {SearchBoxComponent} from '../../shared/search/search-box/search-box.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {SearchService} from '../../analysis/search.service';
import {UploadService} from '../../files-nav/upload.service';
import {FilesService} from '../../files-nav/files.service';
import {AboutUsComponent} from '../../about-us/about-us.component';
import {AnalysisComponent} from '../../analysis/analysis.component';
import {SnpsIndelsComponent} from '../../analysis/snps-indels/snps-indels.component';
import {SnpIndelDetailsComponent} from '../../analysis/snps-indels/snp-indel-details/snp-indel-details.component';
import {GeneComponent} from '../../analysis/gene/gene.component';
import {GeneDialogComponent} from '../../analysis/dialogs/gene-dialog/gene-dialog.component';
import {HelpDialogComponent} from '../../analysis/dialogs/help-dialog/help-dialog.component';
import {SpinnerDialogComponent} from '../../components/spinner-dialog/spinner-dialog.component'
import {StrainDialogComponent} from '../../analysis/dialogs/strain-dialog/strain-dialog.component';
import {StrainComponent} from '../../analysis/strain/strain.component';
import {LoginComponent} from '../../login/login.component';
import {AuthenticationService} from '../../login/authentication.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '../../helpers/jwt.interceptor';
import {ErrorInterceptor} from '../../helpers/error.interceptor';
import {MatSortModule} from '@angular/material/sort';
import {StrainVariantComponent} from '../../analysis/strain-variant/strain-variant.component';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatAutocompleteModule
} from '@angular/material';
import {NumberDirective} from 'app/directives/numbers-only.directive';
import { MvarApiComponent } from 'app/mvar-api';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatTableModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatProgressBarModule,
        HttpClientModule,
        MatDialogModule,
        MatCheckboxModule,
        MatChipsModule,
        MatExpansionModule,
        MatSortModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        NotificationsComponent,
        SnpsIndelsComponent,
        FilesNavComponent,
        SearchBoxComponent,
        UploadDialogComponent,
        AboutUsComponent,
        AnalysisComponent,
        SnpIndelDetailsComponent,
        GeneComponent,
        GeneDialogComponent,
        HelpDialogComponent,
        SpinnerDialogComponent,
        StrainDialogComponent,
        StrainComponent,
        MvarApiComponent,
        LoginComponent,
        NumberDirective,
        StrainVariantComponent
    ],
    providers: [FilesService, UploadService, SearchService, AuthenticationService,
        {provide: MatDialogRef, useValue: {}},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
    entryComponents: [UploadDialogComponent, GeneDialogComponent, StrainDialogComponent, HelpDialogComponent, SpinnerDialogComponent],
})

export class AdminLayoutModule {
}
