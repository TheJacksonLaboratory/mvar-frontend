import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';

import { SnpsIndelsComponent } from '../../analysis/snps-indels/snps-indels.component';
import { StructuralVarComponent } from '../../analysis/structural-var/structural-var.component';
import { FilesNavComponent } from '../../files-nav/files-nav.component';
import { UploadDialogComponent } from '../../files-nav/upload-dialog/upload-dialog.component';
import { SearchBoxComponent } from '../../shared/search/search-box/search-box.component';
import { SearchCriteriaBoxComponent } from '../../shared/search/search-criteria-box/search-criteria-box.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {SearchService} from "../../analysis/search.service";
import { UploadService } from '../../files-nav/upload.service';
import { FilesService} from '../../files-nav/files.service';
import { SamplesComponent } from '../../analysis/samples/samples.component';
import { AboutUsComponent } from '../../about-us/about-us.component';
import { AnalysisComponent } from '../../analysis/analysis.component';
import { SampleDetailsComponent } from '../../analysis/samples/sample-details/sample-details.component';


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
  MatAutocompleteModule,
} from '@angular/material';
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
      MatExpansionModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    NotificationsComponent,
      SnpsIndelsComponent,
      StructuralVarComponent,
      FilesNavComponent,
      SearchBoxComponent,
      SearchCriteriaBoxComponent,
      UploadDialogComponent,
      SamplesComponent,
      AboutUsComponent,
      AnalysisComponent,
      SampleDetailsComponent
  ],
  providers: [FilesService, UploadService, SearchService, {provide: MatDialogRef, useValue: {}}],
  entryComponents: [UploadDialogComponent],
})

export class AdminLayoutModule {}
