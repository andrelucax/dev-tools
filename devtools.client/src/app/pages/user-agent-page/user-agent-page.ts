import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UserAgentService } from './user-agent-service/user-agent-service';
import { LoadingService } from '../../shared/loading-service/loading-service';
import { UserAgentModel } from '../../api/user-agent';
import { MessageService } from '../../shared/message-service/message-service';
import { finalize } from 'rxjs';
import { ClipboardOutput } from '../../shared/clipboard-output/clipboard-output';

@Component({
  selector: 'dt-user-agent-page',
  imports: [
    MatDividerModule,
    MatButtonModule,
    ClipboardOutput
  ],
  templateUrl: './user-agent-page.html',
  styleUrl: './user-agent-page.scss',
})
export class UserAgentPage {
  private readonly userAgentService = inject(UserAgentService);
  private readonly loadingService = inject(LoadingService);
  private readonly messageService = inject(MessageService);

  protected model = signal<UserAgentModel | null>(null);

  protected getUserAgent() {
    this.loadingService.show();

    this.userAgentService.get()
      .pipe(
        finalize(() => this.loadingService.hide())
      ).subscribe({
      next: (data) => {
        this.model.set(data);
      },
      error: (err) => {
        console.error(err);
        this.messageService.showError("Failed to get User-Agent");
      }
    });
  }
}
