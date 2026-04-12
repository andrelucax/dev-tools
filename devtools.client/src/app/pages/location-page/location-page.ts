import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LocationData, LocationService } from '../../shared/location-service/location-service';
import { MessageService } from '../../shared/message-service/message-service';
import { ClipboardOutput } from '../../shared/clipboard-output/clipboard-output';
import { SafeUrlPipe } from '../../shared/safe-url-pipe/safe-url-pipe';
import { LoadingService } from '../../shared/loading-service/loading-service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'dt-location-page',
  imports: [
    MatButtonModule,
    ClipboardOutput,
    SafeUrlPipe,
    MatDividerModule
  ],
  templateUrl: './location-page.html',
  styleUrl: './location-page.scss',
})
export class LocationPage {
  private readonly locationService = inject(LocationService);
  private readonly messageService = inject(MessageService);
  private readonly loadingService = inject(LoadingService);

  protected data = signal<LocationData | undefined>(undefined);
  protected printableData = computed(() => this.data() ? JSON.stringify(this.data(), null, 2) : undefined);

  protected mapUrl = computed(() => {
    const data = this.data();

    if (!data) return null;

    return `https://www.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed`;
  });

  protected async getLocation() {
    this.loadingService.show();
    try {
      const data = await this.locationService.getLocation();
      this.data.set(data);
    } catch(err) {
      if (err instanceof Error) {
        this.messageService.showError(err.message);
      } else {
        this.messageService.showError("Unexpected error getting geolocation");
      }
    } finally {
      this.loadingService.hide();
    }
  }
}
