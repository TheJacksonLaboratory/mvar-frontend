import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { SnpsIndelsComponent } from './analysis/snps-indels/snps-indels.component';
import { StrainVariantComponent } from './analysis/strain-variant/strain-variant.component';
import { FilesNavComponent } from './files-nav/files-nav.component';
import { MvarApiComponent } from './mvar-api';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes =[
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'variant', component: SnpsIndelsComponent },
  { path: 'strain-variant', component: StrainVariantComponent },
  { path: 'filesNav', component: FilesNavComponent },
  { path: 'mvar-api', component: MvarApiComponent },
  { path: 'about', component: AboutComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(routes, { useHash: true });

