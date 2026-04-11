import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

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

  protected readonly hasChild = toSignal(
    this.route.url.pipe(
      map(() => !!this.route.firstChild)
    ),
    { initialValue: !!this.route.firstChild }
  );
}
