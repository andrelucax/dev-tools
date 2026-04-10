import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationFocusService {

  private _router = inject(Router);

  readonly navigationEnd$: Observable<NavigationEnd> = this._router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
  );
}
