import { Component, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { NavigationFocusService } from '../shared/navigation-focus-service/navigation-focus-service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { ComponentNav } from '../component-nav/component-nav';
import { ComponentHeader } from '../component-header/component-header';
import { Navbar } from '../navbar/navbar';

const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: 'dt-layout',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    AsyncPipe,
    ComponentNav,
    ComponentHeader,
    Navbar
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

  private _navigationFocusService = inject(NavigationFocusService);

  readonly sidenav = viewChild(MatSidenav);

  protected isScreenSmall: Observable<boolean>;

  constructor() {
    const breakpoints = inject(BreakpointObserver);

    this.isScreenSmall = breakpoints
      .observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));

    this._navigationFocusService.navigationEnd$
      .pipe(
        takeUntilDestroyed(),
        map(() => this.isScreenSmall),
      )
      .subscribe(shouldCloseSideNav => {
        const sidenav = this.sidenav();
        if (shouldCloseSideNav && sidenav) {
          sidenav.close();
        }
      });
  }

  protected toggleSidenav(): void {
    this.sidenav()?.toggle();
  }
}
