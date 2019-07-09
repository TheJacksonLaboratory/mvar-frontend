import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { SnpsIndelsComponent } from '../../analysis/snps-indels/snps-indels.component';
import {StructuralVarComponent} from "../../analysis/structural-var/structural-var.component";
import {FilesNavComponent} from "../../files-nav/files-nav.component";
import { SamplesComponent } from '../../analysis/samples/samples.component';
import { AboutUsComponent } from '../../about-us/about-us.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'snpsIndels',     component: SnpsIndelsComponent },
    { path: 'structuralVar',     component: StructuralVarComponent },
    { path: 'filesNav', component: FilesNavComponent },
    { path: 'samples', component: SamplesComponent},
    { path: 'aboutUs', component: AboutUsComponent },
];
