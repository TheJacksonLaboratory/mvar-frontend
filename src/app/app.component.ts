import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { filter, takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';

// declare gtag function for Google Analytics
declare function gtag(command: string, type: string, content: object): void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  unsubscribe$ = new Subject<void>();

  constructor(public location: Location, private router: Router, private cookiesService: NgcCookieConsentService) { }

  ngOnInit() {
    const isWindows = navigator.platform.indexOf('Win') > -1;
    this.initCookieConsent();

    if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
      // if we are on Windows OS we activate the perfectScrollbar function

      document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    }
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });
    this.router.navigate(['/dashboard']);
  }
  isMaps(path) {
    let title = this.location.prepareExternalUrl(this.location.path());
    title = title.slice(1);
    return path !== title;
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initCookieConsent(): void {
    this.cookiesService.statusChange$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (event: NgcStatusChangeEvent) => {
        const consentMode = {
          functionality_storage: event.status === 'allow' ? 'granted' : 'denied',
          security_storage: event.status === 'allow' ? 'granted' : 'denied',
          ad_storage: event.status === 'allow' ? 'granted' : 'denied',
          analytics_storage: event.status === 'allow' ? 'granted' : 'denied',
          personalization: event.status === 'allow' ? 'granted' : 'denied',
          ad_user_data: event.status === 'allow' ? 'granted' : 'denied',
          ad_personalization: event.status === 'allow' ? 'granted' : 'denied',
          personalization_storage: event.status === 'allow' ? 'granted' : 'denied'
        };

        gtag('consent', 'update', consentMode);
        localStorage.setItem('consentMode', JSON.stringify(consentMode));
      });
  }

}
