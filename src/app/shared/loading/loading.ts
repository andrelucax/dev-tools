import { Component, inject, Input } from '@angular/core';
import { LoadingService } from '../loading-service/loading-service';

@Component({
  selector: 'dt-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  protected readonly loadingService = inject(LoadingService);

  @Input({ required: true }) loading: boolean = false;
}
