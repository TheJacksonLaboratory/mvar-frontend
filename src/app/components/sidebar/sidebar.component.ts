import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Mouse Variation Registry',  icon: 'dashboard', class: '' },
    // { path: '/login', title: 'User Login',  icon:'person', class: '' },
    { path: '/variant', title: 'Mouse SNPs / INDELs',  icon:'table_chart', class: '' },
    { path: '/strain-variant', title: 'Strain Variant',  icon:'tune', class: '' },
    // { path: '/filesNav', title: 'VCF Files',  icon:'folder', class: '' },
    { path: '/mvar-api', title: 'API Documentation', icon:'api', class: '' },
    { path: '/about', title: 'About',  icon:'explore', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
