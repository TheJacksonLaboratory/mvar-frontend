import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { SnpsIndelsComponent } from '../../analysis/snps-indels/snps-indels.component';
import {FilesNavComponent} from '../../files-nav/files-nav.component';
import { AboutUsComponent } from '../../about-us/about-us.component';
import {LoginComponent} from '../../login/login.component';
import {StrainVariantComponent} from '../../analysis/strain-variant/strain-variant.component';
import { MvarApiComponent } from 'app/mvar-api';


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
    { path: 'login',   component: LoginComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'variant',     component: SnpsIndelsComponent },
    { path: 'strain-variant',     component: StrainVariantComponent },
    // { path: 'variant/:rareVar/:candidateVar/:confirmedVar',     component: SnpsIndelsComponent},
    { path: 'filesNav', component: FilesNavComponent },
    { path: 'mvar-api', component: MvarApiComponent },
    { path: 'aboutUs', component: AboutUsComponent },
    { path: 'aboutUs/:selectedTab', component: AboutUsComponent },
];
