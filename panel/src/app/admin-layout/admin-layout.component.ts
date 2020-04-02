import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';

import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import PerfectScrollbar from 'perfect-scrollbar';

import { SubSink } from 'subsink';
import { ApiService } from 'app/services/services';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  private subs = new SubSink();
  auth = false;

  constructor(
    public location: Location,
    private router: Router,
    private apiService: ApiService,
    private userIdle: UserIdleService
  ) {
    this.apiService.auth.subscribe(( status: boolean ) => { this.auth = status });
  }

  ngOnInit() {
    const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    // if we are on windows OS we activate the perfectScrollbar function
    if ( isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini') ) {
      document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    }
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

    this.subs.add(
      this.location.subscribe(( ev: PopStateEvent ) => {
        this.lastPoppedUrl = ev.url;
      })
    );
    this.subs.add(
      this.router.events.subscribe(( event: any ) => {
        if ( event instanceof NavigationStart ) {
          if ( event.url !== this.lastPoppedUrl) {
            this.yScrollStack.push(window.scrollY);
          }
        } else if ( event instanceof NavigationEnd ) {
          if ( event.url === this.lastPoppedUrl ) {
            this.lastPoppedUrl = undefined;
            window.scrollTo( 0, this.yScrollStack.pop() );
          } else {
            window.scrollTo( 0, 0 );
          }
        }
      })
    );
    this._router = this.router.events
      .pipe( filter( event => event instanceof NavigationEnd ) )
      .subscribe(( event: NavigationEnd ) => {
        elemMainPanel.scrollTop = 0;
        elemSidebar.scrollTop = 0;
      });
    if ( window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() ) {
      let ps = new PerfectScrollbar( elemMainPanel );
      ps = new PerfectScrollbar( elemSidebar );
    }
    setTimeout(() => { this.apiService.restoreAccess(); }, 1000 );
  }

  ngAfterViewInit() {
    this.runOnRouteChange();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  isMaps( path ) {
    let titlee = this.location.prepareExternalUrl( this.location.path() );
    titlee = titlee.slice( 1 );
    return path !== titlee;
  }

  runOnRouteChange(): void {
    if ( window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() ) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar( elemMainPanel );
      ps.update();
    }
  }

  isMac(): boolean {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0;
  }

}
