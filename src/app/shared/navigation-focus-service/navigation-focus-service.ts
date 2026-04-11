import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationFocusService {

  private router = inject(Router);

  readonly navigationEnd$: Observable<NavigationEnd> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
  );
}
