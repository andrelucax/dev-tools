import { Component, inject, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from '../message-service/message-service';

@Component({
  selector: 'dt-clipboard-output',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './clipboard-output.html',
  styleUrl: './clipboard-output.scss',
})
export class ClipboardOutput {
  @Input({required: true}) output?: string;

  protected _secret = signal<boolean>(false);
  @Input()
  set secret(v: boolean) {
    this._secret.set(v);

    if (v) {
      this.hidden = true;
    }
  }

  protected hidden = this._secret();

  private readonly messageService = inject(MessageService);

  protected async copyToClipboard() {
    if (!this.output)
      return;

    try {
      await navigator.clipboard.writeText(this.output);
      this.messageService.showSuccess("Copied to clipboard");
    } catch {
      this.messageService.showError("Failed to copy to clipboard");
    }
  }

  protected toggleHidden() {
    this.hidden = !this.hidden;
  }
}
