import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatPaginatorModule, MatTableModule, MatAutocompleteModule, MatTabsModule, MatCardModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressBarModule, MatDialogModule, MatCheckboxModule, MatChipsModule, MatExpansionModule, MatSortModule, MatProgressSpinnerModule, MatDialogRef } from '@angular/material';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SnpsIndelsComponent } from './analysis/snps-indels/snps-indels.component';
import { AboutComponent } from './about/about.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { GeneDialogComponent } from './analysis/dialogs/gene-dialog/gene-dialog.component';
import { HelpDialogComponent } from './analysis/dialogs/help-dialog/help-dialog.component';
import { StrainDialogComponent } from './analysis/dialogs/strain-dialog/strain-dialog.component';
import { GeneComponent } from './analysis/gene/gene.component';
import { SnpIndelDetailsComponent } from './analysis/snps-indels/snp-indel-details/snp-indel-details.component';
import { StrainVariantComponent } from './analysis/strain-variant/strain-variant.component';
import { StrainComponent } from './analysis/strain/strain.component';
import { SpinnerDialogComponent } from './components/spinner-dialog/spinner-dialog.component';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';
import { NumberDirective } from './directives/numbers-only.directive';
import { FilesNavComponent } from './files-nav/files-nav.component';
import { UploadDialogComponent } from './files-nav/upload-dialog/upload-dialog.component';
import { LoginComponent } from './login/login.component';
import { MvarApiComponent } from './mvar-api';
import { SearchBoxComponent } from './shared/search/search-box/search-box.component';

import { SearchService } from './analysis/search.service';
import { FilesService } from './files-nav/files.service';
import { UploadService } from './files-nav/upload.service';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthenticationService } from './login/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    ComponentsModule,
    RouterModule,
    CommonModule,
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
    MatProgressSpinnerModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    NotificationsComponent,
    SnpsIndelsComponent,
    FilesNavComponent,
    SearchBoxComponent,
    UploadDialogComponent,
    AboutComponent,
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
    StrainVariantComponent,
    TableOfContentsComponent
  ],
  providers: [FilesService, UploadService, SearchService, AuthenticationService, Location,
    { provide: MatDialogRef, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  entryComponents: [UploadDialogComponent, GeneDialogComponent, StrainDialogComponent, HelpDialogComponent, SpinnerDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
