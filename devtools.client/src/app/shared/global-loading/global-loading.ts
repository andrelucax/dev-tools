import { Component, inject } from '@angular/core';
import { LoadingService } from '../loading-service/loading-service';
import { Loading } from '../loading/loading';

@Component({
  selector: 'dt-global-loading',
  imports: [
    Loading
  ],
  templateUrl: './global-loading.html',
  styleUrl: './global-loading.scss',
})
export class GlobalLoading {
  protected readonly loadingService = inject(LoadingService);
}
