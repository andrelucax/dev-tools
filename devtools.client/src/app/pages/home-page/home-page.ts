import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { NavigationFocusService } from '../../shared/navigation-focus-service/navigation-focus-service';

@Component({
  selector: 'dt-home-page',
  imports: [
    RouterOutlet
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly route = inject(ActivatedRoute);
  private readonly navigationFocusService = inject(NavigationFocusService);

  protected readonly hasChild = toSignal(
    this.navigationFocusService.navigationEnd$.pipe(
      map(() => {
        const child = this.route.firstChild;
        return !!child;
      })
    ),
    { initialValue: !!this.route.firstChild }
  );
}
