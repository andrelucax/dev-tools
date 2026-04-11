import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  private count = signal(0);

  readonly loading = computed(() => this.count() > 0);

  show() {
    this.count.update(v => v + 1);
  }

  hide() {
    this.count.update(v => Math.max(0, v - 1));
  }
}
