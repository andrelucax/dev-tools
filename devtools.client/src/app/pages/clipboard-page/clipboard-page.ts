import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { InputSelector } from '../../shared/input-selector/input-selector';
import { EncodedInput } from '../../shared/converter/converter';
import { ClipboardModel, ClipboardRequest } from '../../api/clipboard';
import { ClipboardService } from './clipboard-service/clipboard-service';
import { finalize } from 'rxjs';
import { LoadingService } from '../../shared/loading-service/loading-service';
import { MessageService } from '../../shared/message-service/message-service';
import { ClipboardOutput } from '../../shared/clipboard-output/clipboard-output';
import { ClipboardCodePipe } from './clipboard-code-pipe/clipboard-code-pipe';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CodeMask } from './code-mask/code-mask';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dt-clipboard-page',
  imports: [
    MatDividerModule,
    InputSelector,
    ClipboardOutput,
    ClipboardCodePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CodeMask,
  ],
  templateUrl: './clipboard-page.html',
  styleUrl: './clipboard-page.scss',
})
export class ClipboardPage implements OnInit {

  private readonly clipboardService = inject(ClipboardService);
  private readonly loadingService = inject(LoadingService);
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected form: FormGroup<{
    code: FormControl<string>,
  }>;

  protected model = signal<ClipboardModel | null>(null);

  constructor() {
    this.form = this.fb.group({
      code: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6}$/)]],
    });
  }

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      this.form.patchValue({ code });
      this.load();
    }
  }

  protected setInput(input: EncodedInput) {
    const request: ClipboardRequest = {
      text: input.encoding == 'utf8' ? input.value : null,
      file: input.encoding == 'file' ? input.value : null,
    };

    this.loadingService.show();
    this.clipboardService.upload(request)
      .pipe(
        finalize(() => this.loadingService.hide())
      ).subscribe({
        next: (data) => {
          this.setData(data);
        },
        error: (err) => {
          console.error(err);
          this.messageService.showError("Failed to upload to clipboard");
        }
      });
  }

  protected resetInput() {
    this.model.set(null);
    this.form.enable();
  }

  protected load() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loadingService.show();
    this.clipboardService.get(this.form.value.code!)
      .pipe(
        finalize(() => this.loadingService.hide())
      ).subscribe({
        next: (data) => {
          this.setData(data);
          this.router.navigate([], {
            queryParams: { code: data.code },
            queryParamsHandling: 'merge'
          });
        },
        error: (err) => {
          console.error(err);
          this.messageService.showError("Failed to get clipboard");
        }
      });
  }

  private setData(data: ClipboardModel) {
    this.model.set(data);
    this.form.disable();
  }
}
