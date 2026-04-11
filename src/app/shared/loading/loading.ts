import { Component, inject } from '@angular/core';
import { LoadingService } from '../loading-service/loading-service';

@Component({
  selector: 'dt-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  protected readonly loadingService = inject(LoadingService);
}
