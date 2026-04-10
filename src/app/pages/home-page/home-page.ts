import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

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

  protected readonly hasChild = computed(() => this.route.firstChild);
}
