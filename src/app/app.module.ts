import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
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
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { environment } from '../environments/environment';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieDomain // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  position: 'bottom',
  palette: {
    popup: {
      background: '#E5E7EB'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'classic',
  type: 'opt-out',
  content: {
    message: `Welcome! Our website uses cookies exclusively for usage analytics and reporting metrics to our
    stakeholders and funding agencies about site usage. These cookies also help us understand how visitors
    interact with our site, enabling us to improve your browsing experience and the content we offer. We
    respect your privacy and ensure that all data collected is anonymized and used solely to guide our
    enhancements. Additionally, we do not use this data for marketing purposes nor do we share any user
    information with third parties.
    By clicking "Accept," you consent to our use of cookies for these purposes. For more detailed information
    on the cookies we use and how we handle your data, please review our`,
    dismiss: 'Allow cookies',
    deny: 'Decline',
    allow: 'Accept',
    link: 'Privacy Policy.',
    href: 'https://www.jax.org/privacy-policy',
    policy: 'Cookie Policy'
  }
}

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
    MatRadioModule,
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
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
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
  providers: [FilesService, UploadService, SearchService, AuthenticationService,
    { provide: MatDialogRef, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  // entryComponents: [UploadDialogComponent, GeneDialogComponent, StrainDialogComponent, HelpDialogComponent, SpinnerDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
